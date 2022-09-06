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
 
 const query = /* GraphQL */ `
 query QueryInformationBySort(
   $sort: Int!
   $createdAt: ModelStringKeyConditionInput
   $sortDirection: ModelSortDirection
   $filter: ModelInformationFilterInput
   $limit: Int
   $nextToken: String
 ) {
   queryInformationBySort(
     sort: $sort
     createdAt: $createdAt
     sortDirection: $sortDirection
     filter: $filter
     limit: $limit
     nextToken: $nextToken
   ) {
     items {
       id
     }
     nextToken
   }
 }
`;
 
 exports.handler = async (event) => {
     const condition = {
         sort: 1,
         sortDirection: "DESC",
     };
     try {
         const response = await appSyncRequest(
             query,
             "QueryInformationBySort",
             condition
         );
         const items = response.data.data.queryInformationBySort.items;
         const data = items?.length > 0 ? items[0] : null;
         const idNumber = data ? parseInt(data.id) : 0;
         const nextId = padLeadingZeros(idNumber + 1);
         return {
             statusCode: 200,
             body: {nextId},
         };
     } catch (error) {
         console.log(`getNextInformationId error`, error);
         return error;
     }
 };
 
 function padLeadingZeros(num, size = 6) {
     var s = num + "";
     while (s.length < size) s = "0" + s;
     return s;
 }
 
 /**
  *
  * @param query
  * @param operationName
  * @param condition
  * @returns {Promise<*|*>}
  */
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
 