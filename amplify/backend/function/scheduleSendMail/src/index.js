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
const {
    listInformation,
    queryInformationListSendByInformationId,
} = require("./graphql");

const lambda = new AWS.Lambda({
    region: "ap-northeast-1", //change to your region
});

const sendResetLink = async (email) => {
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
            to: email,
            from: "no-reply@grands.co.jp",
            subject: `パスワードリセットのお知らせ`,
            html: `さん<br /><br />
 ===================================<br /> `,
        };
        await sgMail.send(msg);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const listAllInformation = async (information = [], nextToken = null) => {
    let queryParams = {
        filter: {
            processed_date: {
                attributeExists: false,
            },
            or: [
                {
                    scheduled_delivery_date: {
                        attributeExists: false,
                    },
                },
                {
                    scheduled_delivery_date: {
                        le: moment.utc(new Date()).format("YYYY-MM-DD"),
                    },
                },
            ],
            draft_flag: {
                eq: 0,
            },
        },
        limit: 1000,
    };
    if (nextToken) {
        queryParams.nextToken = nextToken;
    }

    const res = await appSyncRequest(
        listInformation,
        "ListInformation",
        JSON.stringify(queryParams)
    );
    console.log(res.data);
    const {nextToken: nxtToken, items} = res.data?.data?.listInformation;
    information = information.concat(items);
    if (nxtToken) {
        return await listAllInformation(information, nxtToken);
    } else {
        return information;
    }
};

const listAllInformationSendListByInformationId = async (
    informationSendList = [],
    nextToken = null,
    id
) => {
    let queryParams = {
        information_id: id,
        filter: {
            withdrawal_flag: {
                eq: false,
            },
        },
        limit: 1000,
    };
    if (nextToken) {
        queryParams.nextToken = nextToken;
    }

    const res = await appSyncRequest(
        queryInformationListSendByInformationId,
        "QueryInformationListSendByInformationId",
        JSON.stringify(queryParams)
    );
    console.log(res.data);
    const {nextToken: nxtToken, items} =
        res.data?.data?.queryInformationListSendByInformationId;
    informationSendList = informationSendList.concat(items);
    if (nxtToken) {
        return await listAllInformationSendListByInformationId(
            informationSendList,
            nxtToken,
            id
        );
    } else {
        return informationSendList;
    }
};

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    // await sendResetLink("namnt@vn-sis.com");
    const res = await listAllInformation();
    if (res.length > 0) {
        // const response = await Promise.all(res.map(item => {
        //   return  lambda.invoke({
        //       FunctionName: process.env.FUNCTION_PUBLISHINFORMATIONZIPFILE_NAME,
        //       Payload: JSON.stringify({
        //        arguments: {
        //             folder: `public/information/${item?.id}/`,
        //             zipFileName:`${moment().format("YYYYMMDD_HHmmss")}_archive.zip`
        //        }
        //       }) // pass params
        //     }).promise();
        // }))
        // console.log(response);
        const informationSendList = await Promise.all(
            res.map((item) => {
                return listAllInformationSendListByInformationId(
                    [],
                    null,
                    item?.id
                );
            })
        );
        const newInformationSendList = informationSendList.map((it) => {
            const newIt = it.filter((item) => {
                if (item.information.important_info_flag == 0) {
                    return item.receive_notification_email_flag;
                } else {
                    return true;
                }
            });
            return newIt;
        });
        console.log(res);
        console.log(newInformationSendList);
        // const data = newInformationSendList.map(async (item) => {
        //     return await Promise.all(item.map((it) => sendResetLink(it.email)));
        // });
        // console.log(data);
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
