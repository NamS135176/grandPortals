import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, FormHelperText, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useMounted } from '../../hooks/use-mounted';
import toast from 'react-hot-toast';

export const PasswordResettingForm = (props) => {
	const router = useRouter();
	const isMounted = useMounted();
	const formik = useFormik({
		initialValues: {
			password: '',
			passwordConfirm: '',
			submit: null,
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.max(255)
				.required('新しいパスワードは必須です。')
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
				),
			passwordConfirm: Yup.string()
				.oneOf(
					[Yup.ref('password'), null],
					'新しいパスワードとパスワード（確認）が一致していません。'
				)
				.required('新しいパスワード（確認）は必須です。')
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
					'新しいパスワードと新しいパスワード（確認）が一致しているか。'
				),
		}),
		onSubmit: async (values, helpers) => {
			try {
				if (isMounted()) {
					helpers.setStatus({ success: true });
					helpers.setSubmitting(false);
					const returnUrl = '/login';
					router.push(returnUrl).catch(console.error);
					toast.success('パスワードを変更しました。');
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
				error={Boolean(formik.touched.password && formik.errors.password)}
				fullWidth
				helperText={formik.touched.password && formik.errors.password}
				label="新しいパスワード"
				margin="normal"
				name="password"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				type="password"
				value={formik.values.password}
			/>
			<TextField
				error={Boolean(
					formik.touched.passwordConfirm && formik.errors.passwordConfirm
				)}
				fullWidth
				helperText={
					formik.touched.passwordConfirm && formik.errors.passwordConfirm
				}
				label="新しいパスワード（確認）"
				margin="normal"
				name="passwordConfirm"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				type="password"
				value={formik.values.passwordConfirm}
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
					変更
				</Button>
			</Box>
		</form>
	);
};
