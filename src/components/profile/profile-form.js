import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {useFormik} from 'formik';
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
	Checkbox,
	FormControlLabel,
	Box,
} from '@mui/material';
import {wait} from '../../utils/wait';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {API} from 'aws-amplify';
import {parseUserName} from 'utils/user';
import {updateUser} from 'graphql/mutations';
import {useAuth} from 'hooks/use-auth';

export const ProfileForm = (props) => {
	const {reloadUserInfo} = useAuth();
	const {user = {}, mode = 'regist', ...other} = props;
	console.log('ProfileForm... ', {user});
	const router = useRouter();
	const parsedName = parseUserName(user.name);
	const parsedNameKana = parseUserName(user.nameKana);
	const formik = useFormik({
		initialValues: {
			surname: parsedName[0],
			name: parsedName[1],
			surnameKana: parsedNameKana[0],
			nameKana: parsedNameKana[1],
			email: user.email || '',
			emailAlerts: true,
			submit: null,
		},
		validationSchema: Yup.object({
			surname: Yup.string().max(255).required('姓は必須です。'),
			name: Yup.string().max(255).required('名は必須です。'),
			surnameKana: Yup.string()
				.max(255)
				.required('姓（カナ）は必須です。'),
			emailAlerts: Yup.boolean(),
			nameKana: Yup.string().max(255).required('名（カナ）は必須です。'),
		}),
		onSubmit: async (values, helpers) => {
			try {
				// NOTE: Make API request
				await API.graphql({
					query: updateUser,
					variables: {
						input: {
							id: user.id,
							name: `${values.name} ${values.surname}`,
							name_kana: `${values.nameKana} ${values.surnameKana}`,
						},
					},
				});
				await reloadUserInfo();
				helpers.setStatus({success: true});
				helpers.setSubmitting(false);
				const returnUrl = '/';
				router.push(returnUrl).catch(console.error);
				toast.success('プロフィールを登録しました。');
			} catch (err) {
				console.error(err);
				toast.error('エラーが発生しました。');
				helpers.setStatus({success: false});
				helpers.setErrors({submit: err.message});
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
								error={Boolean(
									formik.touched.surname &&
										formik.errors.surname
								)}
								fullWidth
								helperText={
									formik.touched.surname &&
									formik.errors.surname
								}
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
								error={Boolean(
									formik.touched.name && formik.errors.name
								)}
								fullWidth
								helperText={
									formik.touched.name && formik.errors.name
								}
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
									formik.touched.surnameKana &&
										formik.errors.surnameKana
								)}
								fullWidth
								helperText={
									formik.touched.surnameKana &&
									formik.errors.surnameKana
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
									formik.touched.nameKana &&
										formik.errors.nameKana
								)}
								fullWidth
								helperText={
									formik.touched.nameKana &&
									formik.errors.nameKana
								}
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
								required
							/>
						</Grid>
					</Grid>
					<Box sx={{mt: 2}}>
						<FormControlLabel
							control={
								<Checkbox
									name="emailAlerts"
									checked={formik.values.emailAlerts}
									onChange={() =>
										formik.setFieldValue(
											'emailAlerts',
											!formik.values.emailAlerts
										)
									}
								/>
							}
							label="お知らせメールを受け取る"
						/>
					</Box>
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
						sx={{m: 1}}
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
