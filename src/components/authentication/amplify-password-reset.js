import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, FormHelperText, TextField, Typography } from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';
import awsmobile from 'aws-exports';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import { checkLinkValidation , settingCognitoPassword} from 'graphql/queries';
import toast from 'react-hot-toast';

export const AmplifyPasswordReset = (props) => {
  const isMounted = useMounted();
  const { passwordReset } = useAuth();
  const router = useRouter();
  const {code, email} = router.query
  const itemsRef = useRef([]);
  const [username, setUsername] = useState('');
  const [coded,   setCode] = useState(['', '', '', '', '', ''])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // email: username,
      password: '',
      passwordConfirm: '',
      submit: null
    },
    validationSchema: Yup.object({
      // email: Yup
      //   .string()
      //   .email('メールアドレス形式で指定してください。')
      //   .max(255)
      //   .required('メールアドレスは必須です。'),
      password: Yup
        .string()
        .matches(
					/^(.*[0-9a-zA-Z!"#\$%&'\(\)-\^\@;:\[\],\.\/=~\|`{\+\*}<>\?_])\S$/,
					'新しいパスワードは半角英数記号で8文字以上、32文字以内を指定してください。'
				)
				.min(
					8,
					'新しいパスワードは半角英数記号で8文字以上、32文字以内を指定してください。'
				)
				.max(
					32,
					'新しいパスワードは半角英数記号で8文字以上、32文字以内を指定してください。'
				).required('新しいパスワードは必須です。'),
       
      passwordConfirm: Yup
        .string()
        .matches(
					/^(.*[0-9a-zA-Z!"#\$%&'\(\)-\^\@;:\[\],\.\/=~\|`{\+\*}<>\?_])\S$/,
					'新しいパスワード（確認）は半角英数記号で8文字以上、32文字以内を指定してください。'
				)
        .min(
					8,
					'新しいパスワード（確認）は半角英数記号で8文字以上、32文字以内を指定してください。'
				)
				.max(
					32,
					'新しいパスワード（確認）は半角英数記号で8文字以上、32文字以内を指定してください。'
				)
        .oneOf([Yup.ref('password'), null], '新しいパスワードとパスワード（確認）が一致していません。')
        .required('新しいパスワード（確認）は必須です。')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const params = {
					input: {
						email: username,
						password: values.password,
					},
				};
        await settingPassword(params);

        if (isMounted()) {
          router.push('/login').catch(console.error);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  const checkLinkIsValid = async (id) => {
    awsmobile.aws_appsync_authenticationType = 'AWS_IAM';
    Amplify.configure(awsmobile);
    try {
      const res_gq = await API.graphql(
        graphqlOperation(checkLinkValidation, { id })
      );
      // console.log(res_gq);
      return res_gq;
    } catch (err) {
      console.log(err);
    }
  };

  const settingPassword = async (params) => {
    awsmobile.aws_appsync_authenticationType = 'AWS_IAM';
    Amplify.configure(awsmobile);
    const res_gq = await API.graphql(
      graphqlOperation(settingCognitoPassword, JSON.stringify(params))
    );
    return res_gq;
  };

  useEffect(() => {
    if(code){
      checkLinkIsValid(router.query.code).then(res => {
        const res_data = JSON.parse(res.data.checkLinkValidation);
        console.log('res_data', res_data);
        if (res_data.status !== 200) {
          toast.error(
            'パスワードリセットの有効期限が過ぎました。リセットする場合は再度パスワードリセットを実行してください'
          );
          router.push('/login');
        } else {
          console.log('email set');
          setUsername(res_data.email);
        }
      })
    }
    if(email){
      setUsername(email);
    }

    // itemsRef.current = itemsRef.current.slice(0, 6);

    // const storedUsername = localStorage.getItem('username');

    // if (storedUsername) {
    //   setUsername(storedUsername);
    // }
    // if(code){
    //   setCode(code.split(""))
    // }
  }, [code, email]);

  const handleKeyDown = (event, index) => {
    if (event.code === 'Enter') {
      if (formik.values.code[index]) {
        formik.setFieldValue(`code[${index}]`, '');
        return;
      }

      if (index > 0) {
        formik.setFieldValue(`code[${index}]`, '');
        itemsRef.current[index - 1].focus();
        return;
      }
    }

    if (Number.isInteger(parseInt(event.key, 10))) {
      formik.setFieldValue(`code[${index}]`, event.key);

      if (index < 5) {
        itemsRef.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (event) => {
    const paste = event.clipboardData.getData('text');
    const pasteArray = paste.split('');

    if (pasteArray.length !== 6) {
      return;
    }

    let valid = true;

    pasteArray.forEach((x) => {
      if (!Number.isInteger(parseInt(x, 10))) {
        valid = false;
      }
    });

    if (valid) {
      formik.setFieldValue('code', pasteArray);
      itemsRef.current[5].focus();
    }
  };

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      {...props}>
      {/* {!username
        ? (
          <TextField
            autoFocus
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="メールアドレス"
            margin="normal"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />
        )
        : (
          <TextField
            disabled
            fullWidth
            margin="normal"
            value={username}
          />
        )} */}
      {/* <Typography
        color="textSecondary"
        sx={{
          mb: 2,
          mt: 3
        }}
        variant="subtitle2"
      >
        認証コード
      </Typography> */}
      {/* <Box
        sx={{
          columnGap: '16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          py: 1
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((ref, index) => (
          <TextField
            error={Boolean(Array.isArray(formik.touched.code)
              && formik.touched.code.length === 6
              && formik.errors.code)}
            fullWidth
            inputRef={(el) => itemsRef.current[index] = el}
            // eslint-disable-next-line react/no-array-index-key
            key={`code-${index}`}
            name={`code[${index}]`}
            onBlur={formik.handleBlur}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onPaste={handlePaste}
            value={formik.values.code[index]}
            sx={{
              display: 'inline-block',
              textAlign: 'center',
              '& .MuiInputBase-input': {
                textAlign: 'center'
              }
            }}
          />
        ))}
      </Box> */}
      {Boolean(Array.isArray(formik.touched.code)
        && formik.touched.code.length === 6
        && formik.errors.code) && (
        <FormHelperText
          error
          sx={{ mx: '14px' }}
        >
          {Array.isArray(formik.errors.code) && formik.errors.code.find((x) => x !== undefined)}
        </FormHelperText>
      )}
      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label="新しいパスワード ※ （半角英数記号で8文字以上、32文字以内）"
        margin="normal"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
      />
      <TextField
        error={Boolean(formik.touched.passwordConfirm && formik.errors.passwordConfirm)}
        fullWidth
        helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
        label="新しいパスワード（確認）※ "
        margin="normal"
        name="passwordConfirm"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.passwordConfirm}
      />
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>
            {formik.errors.submit}
          </FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 3 }}>
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          変更
        </Button>
      </Box>
    </form>
  );
};
