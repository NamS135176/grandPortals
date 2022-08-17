/**
 * @type {import('@types/aws-lambda').CustomMessageTriggerHandler}
 */
 exports.handler = async (event, context, callback) => {
	const { codeParameter } = event.request;

	// Define the URL that you want the user to be directed to after verification is complete
 if (event.triggerSource == 'CustomMessage_ForgotPassword') {
		console.log(event.triggerSource);
		const url = `${process.env.PREFIX_DOMAIN}/passwordresetting/${codeParameter}`;
		const message = `山田太郎　さん<br /><br />
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
  -----------------------------------<br /> `;
		event.response.smsMessage = message;
		event.response.emailSubject = `【${process.env.TITLE_HOLDER}】パスワードリセットのお知らせ`;
		event.response.emailMessage = message;
		console.log('event.response', event.response);
	} else {
		callback(null, event);
	}

	return event;
};
