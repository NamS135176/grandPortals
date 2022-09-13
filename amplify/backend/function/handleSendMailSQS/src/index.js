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
	FUNCTION_PUBLISHINFORMATIONZIPFILE_NAME
	REGION
	STORAGE_GRANDSPORTAL_BUCKETNAME
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const axios = require("axios");
const moment = require("moment");
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_GRANDSPORTAL_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const sgMail = require("@sendgrid/mail");
const s3 = new AWS.S3();

const sendResetLink = async (information, file) => {
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
        const msg = {
            to: information.email,
            from: "マイプレイス<no-reply@grands.co.jp>",
            subject: `${information.information.subject}`,
            attachments: [
                {
                    filename: "archive.zip",
                    content: file.toString("base64"),
                    type: "application/zip",
                    disposition: "attachment",
                },
            ],
            html: `${information.name} さん<br /><br />
${information.information.content}<br /><br />
 ※本メールは送信専用となっております。ご返信いただいても管理者には届きませんのでご注意ください。<br /><br />
 ===================================<br /> 
 ┏┓<br />
 ┗■ 株式会社grands<br /><br />
 〒254-0013 神奈川県平塚市田村7丁目26-17<br />
 TEL：050-5443-5974<br />
 FAX：045-345-5047<br />
 Email：info@grands.co.jp<br />
 ===================================<br /> `,
        };
        const dataSendgrid = await sgMail.send(msg);
        console.log(dataSendgrid);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const sendMail = async (information) => {
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
        const msg = {
            to: information.email,
            from: "マイプレイス<no-reply@grands.co.jp>",
            subject: `${information.information.subject}`,
            html: `${information.name} さん<br /><br />
${information.information.content}<br /><br />
 ※本メールは送信専用となっております。ご返信いただいても管理者には届きませんのでご注意ください。<br /><br />
 ===================================<br /> 
 ┏┓<br />
 ┗■ 株式会社grands<br /><br />
 〒254-0013 神奈川県平塚市田村7丁目26-17<br />
 TEL：050-5443-5974<br />
 FAX：045-345-5047<br />
 Email：info@grands.co.jp<br />
 ===================================<br /> `,
        };
        const dataSendgrid = await sgMail.send(msg);
        console.log(dataSendgrid);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    // console.log("HELLO");
    const info = JSON.parse(event.Records[0].body);
    console.log(info);
    const params = {
        Bucket: "grands-portal-resource152938-develop",
        Key: info.filePath,
    };

    try {
        if (info.filePath != "") {
            const data = await s3.getObject(params).promise();
            await sendResetLink(info, data.Body);
        } else {
            await sendMail(info);
        }
    } catch (error) {
        console.log(error);
    }
    return {
        statusCode: 200,
        body: JSON.stringify("Hello from Lambda!"),
    };
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
