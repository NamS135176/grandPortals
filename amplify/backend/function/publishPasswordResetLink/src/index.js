/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["SENDGRID_API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	API_GRANDSPORTAL_GRAPHQLAPIENDPOINTOUTPUT
	API_GRANDSPORTAL_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const axios = require("axios");
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_GRANDSPORTAL_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const sgMail = require("@sendgrid/mail");
const {v4: uuidv4} = require("uuid");

const sendResetLink = async (id, email) => {
    try {
        const {Parameters} = await new AWS.SSM()
            .getParameters({
                Names: ["SENDGRID_API_KEY"].map(
                    (secretName) => process.env[secretName]
                ),
                WithDecryption: true,
            })
            .promise();
        let sendgridApiKey = Parameters[0].Value;
        sgMail.setApiKey(sendgridApiKey);
        const url = `${process.env.PREFIX_DOMAIN}/passwordresetting/${id}`;
        const msg = {
            to: email,
            from: "no-reply@grands.co.jp",
            subject: `【${process.env.TITLE_HOLDER}】パスワードリセットのお知らせ`,
            html: `山田太郎 さん<br /><br />
  [${process.env.TITLE_HOLDER}】のパスワードをリセットするには、次のリンクをクリックしてください。<br /><br />
  パスワードの再設定をご希望の場合は、以下URLをクリックし<br />
  <a href=${url}>${url}</a><br /><br />
  このメールに心当たりがない場合、他の方がパスワードをリセットする際に誤ってお客様のメール アドレスを入力した可能性があります。<br />
  リクエストした覚えがない場合は、何も行わずにこのメールを破棄してください。<br /><br />
  ※本メールは送信専用となっております。ご返信いただいても管理者には届きませんのでご注意ください。<br /><br />
  -----------------------------------<br />
  ${process.env.TITLE_HOLDER}<br /><br />
  0463-79-5564<br />
  株式会社grands<br />
  -----------------------------------<br /> `,
        };
        await sgMail.send(msg);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const listUsers = /* GraphQL */ `
    query ListUsers(
        $id: ID
        $filter: ModelUserFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
    ) {
        listUsers(
            id: $id
            filter: $filter
            limit: $limit
            nextToken: $nextToken
            sortDirection: $sortDirection
        ) {
            items {
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
            nextToken
        }
    }
`;

const createUserTempResetPassword = /* GraphQL */ `
    mutation CreateUserTempResetPassword(
        $input: CreateUserTempResetPasswordInput!
        $condition: ModelUserTempResetPasswordConditionInput
    ) {
        createUserTempResetPassword(input: $input, condition: $condition) {
            id
            email
            delete_flag
            createdAt
            ttl
            updatedAt
        }
    }
`;

const createDBRecord = async (email) => {
    const id = uuidv4();
    const time = new Date();
    const second = time.getTime();
    const setTimeToLive = second / 1000 + 1800; // delete record 30 minutes later
    const ttl = Math.floor(setTimeToLive);
    const params = {
        input: {
            id,
            email: email,
            delete_flag: false,
            ttl: ttl,
        },
    };
    console.log("params ", params);
    try {
        const result = await appSyncRequest(
            createUserTempResetPassword,
            "CreateUserTempResetPassword",
            JSON.stringify(params)
        );
        console.log("result ", result.data.data.createUserTempResetPassword);
        return result.data.data.createUserTempResetPassword.id;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.handler = async (event) => {
    try {
        const email = event["arguments"]["email"];
        // const resCheckEmail = await checkEmail(email);
        const result = await appSyncRequest(
            listUsers,
            "ListUsers",
            JSON.stringify({
                filter: {
                    email: {
                        eq: email,
                    },
                },
            })
        );
        console.log(result.data.data.listUsers.items);

        if (result.data.data.listUsers.items > 0) {
            const id = await createDBRecord(email);
            await sendResetLink(id, email);
            const response = {
                statusCode: 200,
                body: JSON.stringify("success"),
            };
            return response;
        } else {
            const response = {
                statusCode: 10,
                body: "登録されていないメールアドレスです。",
            };
            return response;
        }
    } catch (err) {
        const response = {
            statusCode: 500,
            body: JSON.stringify(err),
        };
        return response;
    }
};

const appSyncRequest = async (query, operationName, condition) => {
    const req = new AWS.HttpRequest(appsyncUrl, region);
    const body = {
        query: query,
        operationName: operationName,
        variables: condition,
    };
    if (condition) body["variables"] = condition;
    req.method = "POST";
    req.path = "/graphql";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "multipart/form-data";
    req.body = JSON.stringify(body);
    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
    try {
        const result = await axios({
            method: "post",
            url: appsyncUrl,
            data: req.body,
            headers: req.headers,
        });
        return result;
    } catch (error) {
        error.response.data.errors.map((item) => {
            console.log(item);
        });
        console.log("axios error", error.response.data.errors);
        throw error;
    }
};
