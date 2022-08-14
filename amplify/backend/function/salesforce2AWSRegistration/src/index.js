/* Amplify Params - DO NOT EDIT
	API_GRANDSPORTAL_GRAPHQLAPIENDPOINTOUTPUT
	API_GRANDSPORTAL_GRAPHQLAPIIDOUTPUT
	AUTH_GRANDSPORTAL_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const moment = require('moment');
const axios = require('axios');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_GRANDSPORTAL_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const UserPoolId = process.env.AUTH_GRANDSPORTAL_USERPOOLID
const cognito = new AWS.CognitoIdentityServiceProvider();

const getBukken = /* GraphQL */ `
    query GetBukken($id: ID!) {
        getBukken(id: $id) {
            id
        }
    }
`;
const createUser = /* GraphQL */ `
    mutation CreateUser(
        $input: CreateUserInput!
        $condition: ModelUserConditionInput
    ) {
        createUser(input: $input, condition: $condition) {
            id
            email
            name
            name_kana
            delete_flag
            last_login_date
            sort
            createdAt
            updatedAt
        }
    }
`;
const updateBukken = /* GraphQL */ `
    mutation UpdateBukken(
        $input: UpdateBukkenInput!
        $condition: ModelBukkenConditionInput
    ) {
        updateBukken(input: $input, condition: $condition) {
            id
            s_object_id
            bukken_no
            user_id
            address
            bukken_kind
            floor_plan
            shinchiku_date
            remarks
            delete_flag
            sort
            createdAt
            updatedAt
        }
    }
`;

// update bukken table
const updateBukkenRecord = async (userId, bukkenId) => {
    try {
        const input = {
            input: {
                id: bukkenId,
                user_id: userId
            }
        }
        const result = await appSyncRequest(updateBukken, "UpdateBukken", input);
        // console.log('result', result)
        if (result.data.data !== null) {
            console.log('result.data.data.updateBukken', result.data.data.updateBukken)
            return result.data.data.updateBukken
        } else {
            throw result.data.errors
        }
    } catch(err) {
        console.log(err)
        throw err
    }
};

// create user table
const createDynamoUser = async (id, param) => {
    const now = moment.utc().toISOString();
    const input = {
        input: {
            id: id,
            email: param.email,
            name: param.name,
            name_kana: param.name_kana,
            delete_flag: false,
            last_login_date: now,
            sort: 1,
            createdAt: now
        }
    }
    try {
        const result = await appSyncRequest(createUser, "CreateUser", input);
        // console.log('result', result)
        if (result.data.data.createUser !== null) {
            console.log('result.data.data.createUser', result.data.data.createUser)
            return result.data.data.createUser
        } else {
            throw result.data.errors
        }
    } catch(err) {
        console.log(err)
        throw err
    }
};

// create cognito user
const createCognitoUser = async (email) => {
    try {
        const res = await cognito.adminCreateUser({
            UserPoolId,
            Username: email,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email
                }
            ]
        }).promise()
        console.log('res', res)
        console.log('create user done!')
        // TODO: add user to group
        // await cognito.adminAddUserToGroup({
        //     GroupName: '',
        //     UserPoolId,
        //     Username: id
        // }).promise()
        return res.User.Username
    } catch(err) {
        console.log(err)
        throw err
    }
};

// cognito check
const cognitoCheck = async (params) => {
    try {
        const list = await cognito.listUsers({
			UserPoolId,
            AttributesToGet: ['sub'],
            Filter : `email=\"${params.email}\"`
        }).promise()
        // console.log('list', list)
        if (list.Users.length > 0) {
            console.log('res list : ', list.Users[0])
            return list.Users[0].Username
        } else {
            // create cognito user
            const userId = await createCognitoUser(params.email)
            // create user table
            await createDynamoUser(userId, params);

            return userId
        }
    } catch(err) {
        console.log(err)
        throw err
    }
};

// bukken check
const bukkenCheck = async (bukkenId) => {
    const input = {
        id: bukkenId
    }
    try {
        const result = await appSyncRequest(getBukken, "GetBukken", input);
        // console.log('result', result)
        if (result.data.data.getBukken !== null) {
            console.log('getBukken.id', result.data.data.getBukken.id)
            return true
        } else {
            throw result.data.errors ? result.data.errors : 'bukken not exist'
        }
    } catch (err) {
        console.log(err)
        throw err
    }
};

// parameter check
const checkParams = (event) => {
    const params = event;
    if (!params.email) return [false, 'email'];
    if (!params.name) return [false, 'name'];
    if (!params.name_kana) return [false, 'name_kana'];
    if (!params.bukkenId) return [false, 'bukkenId'];
    return [true, params];
};

// 初期処理
const init = (event) => {
    // 必須パラメータの存在チェック
    const checkedParams = checkParams(event);
    if (!checkedParams[0])
        throw new Error(`parameter error: ${checkedParams[1]}`);
    // 必須パラメータ抜粋
    return checkedParams[1];
};

// エラー処理
const returnError = (errMsg) => {
    return {
        statusCode: 599,
        body: errMsg,
    };
};

// エラー処理
const returnNullError = (errMsg) => {
    return {
        statusCode: 404,
        body: errMsg,
    };
};

// 正常終了
const returnTrue = () => {
    return {
        statusCode: 200,
        body: JSON.stringify('Success creating user'),
    };
};

// メイン処理
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    // parameter check
    let params;
    try {
        params = init(event);
    } catch (err) {
        console.log(err);
        return returnNullError(`${err} not found`);
    }
    // dynamoDB check
    const isBukkenExist = await (async () => {
        try {
            return await bukkenCheck(params.bukkenId);
        } catch (err) {
            return false
        }
    })();
    if (!isBukkenExist) return returnNullError('bukkenId not found');

    // cognito check
    const cognitoId = await (async () => {
        try {
            return await cognitoCheck(params);
        } catch (err) {
            return null
        }
    })();
    console.log('cognitoId', cognitoId);
    if (cognitoId === null || cognitoId === undefined) return returnError('cognitoCheck error: Please check cloudWatch logs');

    // update bukken table
    try {
        await updateBukkenRecord(cognitoId, params.bukkenId);
    } catch (err) {
        return returnError(`updateBukkenRecord error: Please check cloudWatch logs`);
    }

    return returnTrue();
};

// appsync request
const appSyncRequest = async (query, operationName, condition) => {
    const req = new AWS.HttpRequest(appsyncUrl, region);
    // console.log('req', req);
    const body = {
        query: query,
        operationName: operationName,
        variables: condition
    };
    if(condition) body['variables'] = condition;
    req.method = "POST";
    req.path = "/graphql";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "multipart/form-data";
    req.body = JSON.stringify(body);
    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
    try {
        const result = await axios({
            method: 'post',
            url: appsyncUrl,
            data: req.body,
            headers: req.headers,
        });
        // console.log('result', result);
        return result;
    } catch(error) {
        console.log('axios error', error);
        throw error;
    }
};