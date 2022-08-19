import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, FormHelperText, TextField } from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import config from '../../aws-exports';
import { publishPasswordResetLink } from 'graphql/queries';

export const AmplifyPasswordRecovery = (props) => {
  const isMounted = useMounted();
  const { passwordRecovery } = useAuth();
  const router = useRouter();

  const resetPassword = async (params) => {
    config.aws_appsync_authenticationType = 'AWS_IAM';
    Amplify.configure(config);
    // console.log('params', params);
    const res_gq = await API.graphql(
      graphqlOperation(publishPasswordResetLink, JSON.stringify(params))
    );
    return res_gq;
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('メールアドレス形式で指定してください。')
        .max(255)
        .required('メールアドレスは必須です。')
    }),
    onSubmit: async (values, helpers) => {
      try {
        // const res = await resetPassword({
        //   email: values.email
        // })
        // console.log(res);
        await passwordRecovery(values.email);

        if (isMounted()) {
          localStorage.setItem('username', values.email);
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

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      {...props}>
      <TextField
        autoFocus
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label="メールアドレス ※"
        margin="normal"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        value={formik.values.email}
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
          リセット
        </Button>
      </Box>
    </form>
  );
};
