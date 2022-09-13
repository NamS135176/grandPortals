/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["SENDGRID_API_SECRET"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
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
 const UserPoolId = process.env.AUTH_GRANDSPORTAL_USERPOOLID;
 const cognito = new AWS.CognitoIdentityServiceProvider();
 const sgMail = require("@sendgrid/mail");
 
 const axios = require("axios");
 const urlParse = require("url").URL;
 const appsyncUrl = process.env.API_GRANDSPORTAL_GRAPHQLAPIENDPOINTOUTPUT;
 const region = process.env.REGION;
 const endpoint = new urlParse(appsyncUrl).hostname.toString();
 const {updateUser, getUser} = require("./graphql");
 
 // 退会メール送信
 const sendMailToDisabledUser = async (email, name) => {
     try {
         const {Parameters} = await new AWS.SSM()
             .getParameters({
                 Names: ["SENDGRID_API_SECRET"].map(
                     (secretName) => process.env[secretName]
                 ),
                 WithDecryption: true,
             })
             .promise();
         let sendgridApiKey = Parameters[0].Value;
         sgMail.setApiKey(sendgridApiKey);
 
         const msg = {
             to: email,
             from: "マイプレイス<no-reply@grands.co.jp>",
             subject: "【マイプレイス】退会手続き完了のお知らせ",
             html: `
                   ${name} さん<br><br>
                   
                   平素は【マイプレイス】サービスをご利用頂き、誠にありがとうございました。<br>
                   【マイプレイス】サービスの退会手続きが完了しましたので、お知らせいたします。<br><br>
                   
                   またの機会がありましたら、ご利用よろしくお願い申し上げます。<br><br>
           
                   ※本メールは送信専用となっております。ご返信頂いても管理者には届きませんのでご注意ください。<br><br>
                   =================================== <br>
                  ┏┓<br />
                  ┗■ 株式会社grands<br /><br />
                  〒254-0013 神奈川県平塚市田村7丁目26-17<br />
                  TEL：050-5443-5974<br />
                  FAX：045-345-5047<br />
                  Email：info@grands.co.jp<br />
                     =================================== <br>
                   `,
         };
         const resSgMail = await sgMail.send(msg);
         console.log("resSgMail", resSgMail);
         return resSgMail;
     } catch (err) {
         throw err;
     }
 };
 
 // cognitoログイン情報をDisableにする
 const disableCognitoUser = async (email) => {
     try {
         await cognito
             .adminDisableUser({
                 UserPoolId,
                 Username: email,
             })
             .promise();
         console.log("disableCognitoUser SUCCEED!!");
 
         return "ok";
     } catch (err) {
         throw err;
     }
 };
 
 // 渡されたデータに必要なパラメータがあるかチェック
 const checkParams = (event) => {
     const claims = event.identity.claims;
     const sub = claims.sub;
     const name = event.arguments.name;
     if (!sub) return [false, "sub"];
     if (!name) return [false, "name"];
     return [true, {name, sub}];
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
 
 // エラー時RETURN用途
 const returnError = (errMsg) => {
     return {
         statusCode: 599,
         body: JSON.stringify(errMsg),
     };
 };
 
 // 正常終了時RETURN用途
 const returnTrue = () => {
     return {
         statusCode: 200,
         body: "ok",
     };
 };
 
 /**
  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
  */
 exports.handler = async (event) => {
     let params;
     console.log("event: ", event);
     try {
         params = init(event);
     } catch (err) {
         console.log(err);
         return returnError(`init error: ${err}`);
     }
 
     var user = null;
     //update user db
     try {
         const condition = {
             id: params.sub,
         };
         const res = await appSyncRequest(getUser, "GetUser", condition);
         console.log("get user res: ", res.data);
         user = res.data.data.getUser
     } catch (err) {
         console.log(err);
         return returnError(`update user error: ${err}`);
     }
     if (!user) {
         returnError(`Can not get user`);
     }
 
     //  cognitoログイン情報をDisableにする
     try {
         await disableCognitoUser(user.email);
     } catch (err) {
         console.log(err);
         return returnError(`disableCognitoUser error: ${err}`);
     }
     // 退会メール送信
     try {
         await sendMailToDisabledUser(user.email, params.name);
     } catch (err) {
         console.log(err);
         return returnError(`sendMailToDisabledUser error: ${err}`);
     }
 
     //update user db
     try {
         const input = {
             input: {
                 id: params.sub,
                 delete_flag: true,
             },
         };
 
         const res = await appSyncRequest(updateUser, "UpdateUser", input);
         console.log("update user res: ", res.data);
     } catch (err) {
         console.log(err);
         return returnError(`update user error: ${err}`);
     }
 
     return returnTrue();
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
         return result;
     } catch (error) {
         error.response.data.errors.map((item) => {
             console.log(item);
         });
         console.log("axios error", error.response.data.errors);
         throw error;
     }
 };
 