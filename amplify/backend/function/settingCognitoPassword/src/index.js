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
 
 exports.handler = async (event) => {
     try {
         const email = event['arguments']['input']['email'];
         const password = event['arguments']['input']['password'];
         await cognito.adminSetUserPassword({
             UserPoolId,
             Username: email,
             Password: password,
             Permanent: true
         }).promise();
         const response = {
             statusCode: 200,
             body: JSON.stringify('success'),
         };
         return response;
     } catch (err) {
         const response = {
             statusCode: 500,
             body: JSON.stringify(err)
         }
         return response;
     }
 };
 