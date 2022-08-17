/**
 * @type {import('@types/aws-lambda').CustomMessageTriggerHandler}
 */
 exports.handler = async (event, context, callback) => {
	const { codeParameter } = event.request;

	// Define the URL that you want the user to be directed to after verification is complete
 if (event.triggerSource == 'CustomMessage_ForgotPassword') {
		console.log(event.triggerSource);
		const url = `${process.env.PREFIX_DOMAIN}/passwordresetting/${codeParameter}`;
		const message = `件名：パスワードリセット：習慣アプリNeuro Habitsニューロハビッツ<br /><br />
  パスワードリセットの申請を受け付けました。<br /><br />
  パスワードの再設定をご希望の場合は、以下URLをクリックし<br />
  新しいパスワードをご登録ください。<br /><br />
  ※パスワードリセットの申請に心当たりがない場合は<br />
  以降の対応は不要となります。<br /><br />
  ▼パスワードの再設定URL<br />
  <a href=${url}>パスワード再設定用のURLが入ります。</a><br /><br />
  ―――――――――――――――――――――――――――<br />
  習慣アプリ Neuro Habits ニューロハビッツ<br /><br />
  ―――――――――――――――――――――――――――<br /> `;
		event.response.smsMessage = message;
		event.response.emailSubject = 'パスワードリセットの文章作成';
		event.response.emailMessage = message;
		console.log('event.response', event.response);
	} else {
		callback(null, event);
	}

	return event;
};
