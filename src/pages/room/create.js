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
} from '@mui/material';
import {DashboardLayout} from '../../components/dashboard/dashboard-layout';
import {gtm} from '../../lib/gtm';
import {ManagementList} from '../../components/management-menu';
import {ArrowLeft as ArrowLeftIcon} from '../../icons/arrow-left';
import {ArrowRight as ArrowRightIcon} from '../../icons/arrow-right';
import {useRouter} from 'next/router';
import {FileUpload} from '../../components/widgets/file-upload';
import {RoomKind} from '../../utils/global-data';
import {useCreateRoom} from '../../hooks/use-create-room';
import {useBukkenDefault} from '../../hooks/use-bukken-default';

const CreateRoom = () => {
	const router = useRouter();
	const {loading, createRoom} = useCreateRoom('0');

	const {bukken} = useBukkenDefault();
	const [file, setFile] = useState();
	const [coverImage, setCoverImage] = useState();

	const [form, setForm] = useState({
		kind: '',
		name: '',
		remarks: '',
	});

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	const handleChange = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		createRoom(bukken, form.name, form.kind, form.remarks, file);
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
						<Typography variant="subtitle2">
							お問い合わせ：0463-79-5564
						</Typography>
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
									<Grid item sm={4}>
										<CardActionArea href="/interior/list">
											<Card
												elevation={0}
												variant="outlined"
												sx={{
													cursor: 'pointer',
													borderColor: 'primary.main',
													borderWidth: 2,
												}}
											>
												<CardContent>
													<Box
														sx={{
															alignItems:
																'center',
															display: 'flex',
															justifyContent:
																'center',
														}}
													>
														<Typography variant="overline">
															建具インテリア
														</Typography>
													</Box>
												</CardContent>
											</Card>
										</CardActionArea>
									</Grid>
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
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">
											種別
										</InputLabel>
										<Select
											labelId="select-kind"
											id="select-kind"
											name="kind"
											value={form.kind}
											label="種別"
											onChange={handleChange}
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
									</FormControl>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										label="備考"
										multiline
										name="name"
										defaultValue={form.name}
										onChange={handleChange}
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
										defaultValue={form.remarks}
										onChange={handleChange}
										InputLabelProps={{shrink: true}}
									/>
								</Grid>
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
										disabled={
											loading ||
											!form.kind ||
											!form.name ||
											!form.remarks
										}
										onClick={handleSubmit}
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
CreateRoom.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateRoom;
