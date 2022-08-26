/* Amplify Params - DO NOT EDIT
	API_GRANDSPORTAL_GRAPHQLAPIENDPOINTOUTPUT
	API_GRANDSPORTAL_GRAPHQLAPIIDOUTPUT
	AUTH_GRANDSPORTAL_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 const AWS = require("aws-sdk");
 const UserPoolId = process.env.AUTH_GRANDSPORTAL_USERPOOLID
 const cognito = new AWS.CognitoIdentityServiceProvider();
 
 const axios = require("axios");
 const urlParse = require("url").URL;
 const appsyncUrl = process.env.API_GRANDSPORTAL_GRAPHQLAPIENDPOINTOUTPUT;
 const region = process.env.REGION;
 const endpoint = new urlParse(appsyncUrl).hostname.toString();

 const getUserTempResetPassword = /* GraphQL */ `
 query GetUserTempResetPassword($id: ID!) {
     getUserTempResetPassword(id: $id) {
         id
         email
         delete_flag
         createdAt
         ttl
         updatedAt
     }
 }
`;

 exports.handler = async (event) => {
     try {
        //  const email = event['arguments']['input']['email'];
         const password = event['arguments']['input']['password'];
         const id = event['arguments']['input']['idTemp'];
         const result = await appSyncRequest(
            getUserTempResetPassword,
            "GetUserTempResetPassword",
            {
                id: id,
            }
        );
        // console.log()
        if (!result.data.data.getUserTempResetPassword) {
            const response = {
                status: 404,
                email: "not exist",
            };
            console.log(response);
            return response;
        }
        const data = result.data.data.getUserTempResetPassword;
        const now = new Date();
        const time = Math.floor(now.getTime() / 1000);
        const linkCreatedAt = new Date(data.createdAt);
        const linkTime = Math.floor(linkCreatedAt.getTime() / 1000);
        if (data && time - linkTime < 1800) {
            await cognito.adminSetUserPassword({
                UserPoolId,
                Username: data.email,
                Password: password,
                Permanent: true
            }).promise();
            const response = {
                statusCode: 200,
                body: JSON.stringify('success'),
            };
            return response;
        } else {
            const response = {
                statusCode: 403,
                body: JSON.stringify('expired'),
            };
            console.log(response);
            return response;
        }

     } catch (err) {
         const response = {
             statusCode: 500,
             body: JSON.stringify(err)
         }
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
