import {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardActions,
	CardActionArea,
	Container,
	Divider,
	Grid,
	Typography,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from '@mui/material';
import {DashboardLayout} from '../../components/dashboard/dashboard-layout';
import {gtm} from '../../lib/gtm';
import {ManagementList} from '../../components/management-menu';
import {ArrowLeft as ArrowLeftIcon} from '../../icons/arrow-left';
import {useRouter} from 'next/router';
import {FileUpload} from '../../components/widgets/file-upload';
import {RoomKind, UserGroup} from '../../utils/global-data';
import {useCreateRoom} from '../../hooks/use-create-room';
import {useBukkenDefault} from '../../hooks/use-bukken-default';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import * as R from 'ramda';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {useAuth} from '../../hooks/use-auth';
import {AuthGuard} from '../../components/authentication/auth-guard';
import {Friend} from 'react-line-social';

const CreateRoom = () => {
	const {user} = useAuth();
	const router = useRouter();
	const {loading, createRoom} = useCreateRoom('0');

	const {bukken} = useBukkenDefault();
	const [file, setFile] = useState();
	const [coverImage, setCoverImage] = useState();

	const formik = useFormik({
		initialValues: {
			kind: '',
			name: '',
			construction_details: null,
			remarks: null,
			last_construction_date: null,
		},
		validationSchema: Yup.object({
			kind: Yup.string().required('種別は必須です。'),
			name: Yup.string().required('名称は必須です。'),
		}),
		onSubmit: async (values, helpers) => {
			const errors = await helpers.validateForm();
			if (R.isEmpty(errors)) {
				handleSubmit(values);
			}
		},
	});

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	const handleSubmit = (values) => {
		const {
			name,
			kind,
			remarks,
			construction_details,
			last_construction_date,
		} = values;
		const fieldList = {
			name,
			kind,
			remarks,
			construction_details,
			last_construction_date,
		};
		createRoom(bukken, fieldList, file);
	};

	const handleChangeFile = (file) => {
		setFile(file);
		setCoverImage(URL.createObjectURL(file));
	};

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜外装・エクステリア情報</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: {xs: 4, md: 8},
				}}
			>
				<Container maxWidth="xl">
					<Box
						sx={{
							mb: 4,
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<Box>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
								}}
							>
								<Friend lineid="@487rrtrg" locale="ja" />
							</Box>
							<Typography variant="subtitle2">
								お問い合わせ：050-5443-5974
							</Typography>
						</Box>
					</Box>
					<Card>
						<CardContent>
							<ManagementList />
							<Divider
								sx={{
									mb: 3,
									mt: 3,
								}}
							/>
							<Box sx={{mb: 4}}>
								<Grid
									container
									justifyContent="space-between"
									spacing={3}
								>
									<Grid item sm={4}></Grid>
									<Grid item>
										<Typography variant="subtitle2">
											{bukken?.bukken_no
												? `物件番号：${bukken?.bukken_no}`
												: ''}
										</Typography>
									</Grid>
								</Grid>
							</Box>
							<Box sx={{mb: 4}}>
								<Grid
									container
									justifyContent="space-between"
									spacing={3}
								>
									<Grid item>
										<Typography variant="h6" mb={3}>
											部屋・スペース情報
										</Typography>
									</Grid>
									<Grid item>
										<Button
											variant="contained"
											component="label"
											disabled={loading}
										>
											画像追加
											<FileUpload
												accept={'image/*'}
												onChange={handleChangeFile}
												prefix="image"
											>
												<></>
											</FileUpload>
										</Button>
									</Grid>
								</Grid>
							</Box>
							<Box
								sx={{
									backgroundImage: `url(${coverImage})`,
									backgroundColor: '#D0D0D0',
									backgroundPosition: 'center',
									backgroundSize: 'cover',
									borderRadius: 1,
									height: 450,
									width: '100%',
									mt: 3,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							/>
							<Grid container spacing={3} mt={3}>
								<Grid item md={8} xs={12}>
									<FormControl
										fullWidth
										error={Boolean(
											formik.touched.kind &&
												formik.errors.kind
										)}
									>
										<InputLabel
											id="demo-simple-select-label"
											required
										>
											種別
										</InputLabel>
										<Select
											labelId="select-kind"
											id="select-kind"
											name="kind"
											label="種別"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.kind}
										>
											{RoomKind.map((item, idx) => (
												<MenuItem
													value={item}
													key={item}
												>
													{item}
												</MenuItem>
											))}
										</Select>
										<FormHelperText>
											{formik.touched.kind &&
												formik.errors.kind}
										</FormHelperText>
									</FormControl>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										label="名称"
										multiline
										name="name"
										InputLabelProps={{shrink: true}}
										error={Boolean(
											formik.touched.name &&
												formik.errors.name
										)}
										helperText={
											formik.touched.name &&
											formik.errors.name
										}
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.name}
										required
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										multiline
										minRows={4}
										label="施工内容"
										name="construction_details"
										value={
											formik.values.construction_details
										}
										onChange={formik.handleChange}
										InputLabelProps={{shrink: true}}
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										multiline
										minRows={4}
										label="備考"
										name="remarks"
										value={formik.values.remarks}
										onChange={formik.handleChange}
										InputLabelProps={{shrink: true}}
									/>
								</Grid>
								{user.group === UserGroup.support && (
									<Grid item md={8} xs={12}>
										<DesktopDatePicker
											label="最終施工日"
											inputFormat="yyyy/MM/dd"
											value={
												formik.values
													.last_construction_date
											}
											onChange={(date) =>
												formik.setFieldValue(
													'last_construction_date',
													date
												)
											}
											renderInput={(inputProps) => (
												<TextField {...inputProps} />
											)}
										/>
									</Grid>
								)}
								<Box
									sx={{
										justifyContent: 'flex-end',
										width: '100%',
										display: 'flex',
										mt: 2,
									}}
								>
									<Button
										endIcon={
											<ArrowLeftIcon fontSize="small" />
										}
										onClick={() =>
											router.push('/room/list')
										}
										sx={{m: 1}}
										variant="outlined"
									>
										戻る
									</Button>
									<Button
										sx={{m: 1}}
										variant="contained"
										disabled={loading}
										onClick={formik.handleSubmit}
									>
										登録
									</Button>
								</Box>
							</Grid>
						</CardContent>
					</Card>
				</Container>
			</Box>
		</>
	);
};
CreateRoom.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);
export default CreateRoom;
