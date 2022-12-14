import * as Yup from "yup";
import {useFormik} from "formik";
import {Box, Button, FormHelperText, TextField} from "@mui/material";
import {useRouter} from "next/router";
import {useMounted} from "../../hooks/use-mounted";
import { useAuth } from "../../hooks/use-auth";
import { useCallback } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { getUser, createForceResetPassword } from "graphql/queries";
import awsmobile from "aws-exports";
import { createUserTempResetPassword } from "graphql/mutations";

export const AmplifyLogin = (props) => {
    const router = useRouter();
    const isMounted = useMounted();
	const { login } = useAuth();
	
    const getUserInfo = useCallback(async (userId) => {
        const response = await API.graphql({
            query: getUser,
            variables: {
                id: userId,
            },
        });
        return response.data.getUser;
    }, []);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            submit: null,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("メールアドレス形式で指定してください。")
                .max(255)
                .required("メールアドレスは必須です。"),
            password: Yup.string().max(255).required("パスワードは必須です。"),
        }),
        onSubmit: async (values, helpers) => {
            try {
                const cognitoUser = await login(values.email, values.password);
                console.log("login success..", {cognitoUser});
                if(cognitoUser.challengeName == "NEW_PASSWORD_REQUIRED"){
                    awsmobile.aws_appsync_authenticationType = "AWS_IAM";
                    Amplify.configure(awsmobile);
                    // console.log('params', params);
                    const res_gq = await API.graphql(
                        graphqlOperation(createForceResetPassword, JSON.stringify({
                            email: values.email,
                        }))
                    );
                    // console.log();
                    router.push(`/passwordresetting/${JSON.parse(JSON.parse(res_gq.data.createForceResetPassword).body)}`)
                }
                else{
                    if (isMounted()) {
                        //check profile
                        const userInfo = await getUserInfo(cognitoUser.username);
                        console.log("login success..", {userInfo});
                        var returnUrl = "/bukken/list";
                        if (!userInfo?.name) {
                            returnUrl = "/profile/regist";
                        }
                        router.push(returnUrl).catch(console.error);
                    }
                }
            } catch (err) {
                console.error(err.message);

                if (isMounted()) {
                    if (err.code === "UserNotConfirmedException") {
                        sessionStorage.setItem('username', values.email);
                        // router.push('/authentication/verify-code').catch(console.error);
                        const returnUrl = "/passwordresetting";
                        router.push(returnUrl).catch(console.error);
                        return;
                    }

                    helpers.setStatus({success: false});
                    helpers.setErrors({submit: 'メールアドレスもしくはパスワードに誤りがあります。'});
                    helpers.setSubmitting(false);
                }
            }
        },
    });

    return (
        <form noValidate onSubmit={formik.handleSubmit} {...props}>
            <TextField
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
                required
            />
            <TextField
                error={Boolean(
                    formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="パスワード"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                required
            />
            {formik.errors.submit && (
                <Box sx={{mt: 3}}>
                    <FormHelperText error>
                        {formik.errors.submit}
                    </FormHelperText>
                </Box>
            )}
            <Box sx={{mt: 2}}>
                <Button
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    ログイン
                </Button>
            </Box>
        </form>
    );
};
