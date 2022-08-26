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
 const {v4: uuidv4} = require("uuid");

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
    
        const id = await createDBRecord(email);
        const response = {
            statusCode: 200,
            body: JSON.stringify(id),
        };
        return response;
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
