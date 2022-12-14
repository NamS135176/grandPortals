/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const axios = require("axios");
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const moment = require("moment");
const appsyncUrl = process.env.API_GRANDSPORTAL_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const {updateUser} = require("./graphql");

exports.handler = async (event, context) => {
    // insert code to be executed by your lambda trigger
    const {userName} = event;
    const input = {
        input: {
            id: userName,
            last_login_date: moment(new Date()).utc(),
        },
    };
    // console.log(`Update User with ${event.triggerSource} input=`, JSON.stringify(input));
    try {
        const response = await appSyncRequest(
            updateUser,
            "UpdateUser",
            input
        );
        console.log(`Update User with ${event.triggerSource}`, response.data);
    } catch (error) {
        console.log(`Update User error ${event.triggerSource}`, {error});
    }
    return event;
};

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
        // console.log("result", result);
        return result;
    } catch (error) {
        error.response.data.errors.map((item) => {
            console.log(item);
        });
        console.log("axios error", error.response.data.errors);
        throw error;
    }
};
