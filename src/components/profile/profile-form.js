import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
} from '@mui/material';
import { wait } from '../../utils/wait';
import { useRouter } from 'next/router';

export const ProfileForm = (props) => {
	const { user = {}, mode = 'regist', ...other } = props;
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			surname: user.surname || '',
			name: user.name || '',
			surnameKana: user.surnameKana || '',
			nameKana: user.nameKana || '',
			email: user.email || '',
			submit: null,
		},
		validationSchema: Yup.object({
			surname: Yup.string().max(255).required('姓は必須です。'),
			name: Yup.string().max(255).required('名は必須です。'),
			surnameKana: Yup.string().max(255).required('姓（カナ）は必須です。'),
			nameKana: Yup.string().max(255).required('名（カナ）は必須です。'),
		}),
		onSubmit: async (values, helpers) => {
			try {
				// NOTE: Make API request
				await wait(500);
				helpers.setStatus({ success: true });
				helpers.setSubmitting(false);
				const returnUrl = '/';
				router.push(returnUrl).catch(console.error);
				toast.success('プロフィールを登録しました。');
			} catch (err) {
				console.error(err);
				toast.error('エラーが発生しました。');
				helpers.setStatus({ success: false });
				helpers.setErrors({ submit: err.message });
				helpers.setSubmitting(false);
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} {...other}>
			<Card>
				<CardHeader
					title={`プロフィール${mode === 'regist' ? '登録' : '編集'}`}
				/>
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							<TextField
								error={Boolean(formik.touched.surname && formik.errors.surname)}
								fullWidth
								helperText={formik.touched.surname && formik.errors.surname}
								label="姓"
								name="surname"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.surname}
								required
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								error={Boolean(formik.touched.name && formik.errors.name)}
								fullWidth
								helperText={formik.touched.name && formik.errors.name}
								label="名"
								name="name"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.name}
								required
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								error={Boolean(
									formik.touched.surnameKana && formik.errors.surnameKana
								)}
								fullWidth
								helperText={
									formik.touched.surnameKana && formik.errors.surnameKana
								}
								label="姓（カナ）"
								name="surnameKana"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.surnameKana}
								required
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								error={Boolean(
									formik.touched.nameKana && formik.errors.nameKana
								)}
								fullWidth
								helperText={formik.touched.nameKana && formik.errors.nameKana}
								label="名（カナ）"
								name="nameKana"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.nameKana}
								required
							/>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								fullWidth
								label="メールアドレス"
								name="email"
								disabled
								value={formik.values.email}
							/>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions>
					<NextLink href="/" passHref>
						<Button
							component="a"
							disabled={formik.isSubmitting}
							sx={{
								m: 1,
							}}
							variant="outlined"
						>
							戻る
						</Button>
					</NextLink>
					<Button
						disabled={formik.isSubmitting}
						type="submit"
						sx={{ m: 1 }}
						variant="contained"
					>
						登録
					</Button>
				</CardActions>
			</Card>
		</form>
	);
};

ProfileForm.propTypes = {
	user: PropTypes.object.isRequired,
	mode: PropTypes.oneOf(['regist', 'edit']),
};
