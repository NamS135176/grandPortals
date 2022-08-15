import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, FormHelperText, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useMounted } from '../../hooks/use-mounted';
import toast from 'react-hot-toast';
import { useAuth } from 'hooks/use-auth';
export const PasswordResetForm = (props) => {
	const router = useRouter();
	const isMounted = useMounted();
	const {passwordResetRequest} = useAuth();

	const formik = useFormik({
		initialValues: {
			email: '',
			submit: null,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('メールアドレス形式で指定してください。')
				.max(255)
				.required('メールアドレスは必須です。'),
		}),
		onSubmit: async (values, helpers) => {
			try {
				await passwordResetRequest(values.email)
				if (isMounted()) {
					helpers.setStatus({ success: true });
					helpers.setSubmitting(false);
					const returnUrl = '/login';
					router.push(returnUrl).catch(console.error);
					toast.success(
						'入力されたメールアドレス宛にパスワードリセットメールを送信しました。'
					);
				}
			} catch (err) {
				console.error(err);

				if (isMounted()) {
					helpers.setStatus({ success: false });
					helpers.setErrors({ submit: err.message });
					helpers.setSubmitting(false);
				}
			}
		},
	});

	return (
		<form noValidate onSubmit={formik.handleSubmit} {...props}>
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
				required
			/>
			{formik.errors.submit && (
				<Box sx={{ mt: 3 }}>
					<FormHelperText error>{formik.errors.submit}</FormHelperText>
				</Box>
			)}
			<Box sx={{ mt: 2 }}>
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
