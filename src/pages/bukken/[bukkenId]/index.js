import {useEffect, useState} from 'react';
import Head from 'next/head';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardActions,
	Container,
	Divider,
	Grid,
	Typography,
	TextField,
	Skeleton,
} from '@mui/material';

import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {BukkenRelatedDocsListTable} from '../../../components/bukken/bukken-related-docs-list-table';
import {BukkenHistoryListTable} from '../../../components/bukken/bukken-history-list-table';
import {gtm} from '../../../lib/gtm';
import {ManagementList} from '../../../components/management-menu';
import {ArrowRight as ArrowRightIcon} from '../../../icons/arrow-right';
import {HistoryDialog} from '../../../components/history/history-dialog';
import {useRouter} from 'next/router';
import {useBukkenDetail} from '../../../hooks/use-bukken-detail';
import {getBukkenType, OtherObjectKind} from '../../../utils/bukken';
import moment from 'moment';
import {AddDocumentDialog} from '../../../components/bukken/add-document-dialog';
import {FileUpload} from '../../../components/widgets/file-upload';
import {AuthGuard} from 'components/authentication/auth-guard';
import {Friend} from 'react-line-social';

const BukkenDetails = () => {
	const router = useRouter();
	const {bukkenId} = router.query;
	const {
		bukken,
		histories: bukkenHistory,
		documents: bukkenDocs,
		coverImageUrl,
		deleteDocument,
		deleteHistory,
		reloadDocument,
		reloadHistory,
		uploadBukenCover,
		updateBukken,
		loading,
		uploadCoverImage,
	} = useBukkenDetail(bukkenId);

	const [form, setForm] = useState({
		bukken_kind: '',
		floor_plan: '',
		shinchiku_date: '',
		remarks: '',
	});

	useEffect(() => {
		if (!bukken) return;
		setForm({
			bukken_kind: getBukkenType(bukken),
			floor_plan: bukken.floor_plan,
			shinchiku_date: moment().subtract(375, 'days').fromNow(),
			remarks: bukken.remarks,
		});
	}, [bukken]);

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	useEffect(() => {
		//save bukken id to storage for using default bukken when create new room or other object
		if (bukken) {
			sessionStorage.setItem('bukken_id', bukken.id);
		}
	}, [bukken]);

	const handleChange = (event) => {
		console.log(event.target.name);
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
	const handleOpenHistoryDialog = () => {
		setOpenHistoryDialog(true);
	};
	const handleCloseHistoryDialog = () => {
		setOpenHistoryDialog(false);
	};

	const [openDocumentDialog, setOpenDocumentDialog] = useState(false);
	const handleOpenDocumentDialog = () => {
		setOpenDocumentDialog(true);
	};
	const handleCloseDocumentDialog = () => {
		setOpenDocumentDialog(false);
	};

	const handleUpdateBukken = () => {
		updateBukken(form.remarks);
	};

	return (
		<>
			<Head>
				<title>grands????????????????????????????????????</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
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
								?????????????????????050-5443-5974
							</Typography>
						</Box>
					</Box>
					<Card>
						<CardContent>
							<ManagementList />
						</CardContent>
					</Card>
					<Card sx={{mt: 4}}>
						<CardContent>
							<Grid
								container
								justifyContent="space-between"
								spacing={3}
							>
								<Grid item>
									<Typography variant="h6" mb={3}>
										????????????
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="subtitle2">
										???????????????{bukkenId}
									</Typography>
								</Grid>
							</Grid>
							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<Typography variant="h6"></Typography>
								<Button variant="contained" component="label">
									????????????
									<FileUpload
										accept={'image/*'}
										onChange={uploadBukenCover}
										prefix="image"
									>
										<></>
									</FileUpload>
								</Button>
							</Box>
							{uploadCoverImage ? (
								<Skeleton
									animation="wave"
									variant="rectangular"
									width={'100%'}
									height={450}
									sx={{marginTop: '24px'}}
								/>
							) : (
								<Box
									sx={{
										backgroundImage: `url(${coverImageUrl})`,
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
								></Box>
							)}
							<Grid container spacing={3} mt={3}>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										label="????????????"
										name="type"
										required
										disabled
										value={form.bukken_kind}
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										label="?????????"
										name="plan"
										required
										disabled
										value={form.floor_plan}
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										label="?????????"
										name="years"
										required
										disabled
										value={form.shinchiku_date}
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										multiline
										minRows={4}
										label="??????"
										name="remarks"
										defaultValue={form.remarks}
										onChange={handleChange}
										InputLabelProps={{shrink: true}}
									/>
								</Grid>
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										justifyContent: 'flex-end',
									}}
								>
									<Button
										onClick={handleUpdateBukken}
										sx={{mt: 3}}
										variant="contained"
									>
										??????
									</Button>
								</Box>
							</Grid>
						</CardContent>
					</Card>
					<Card sx={{mt: 4}}>
						<CardContent>
							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'space-between',
									mb: 3,
								}}
							>
								<Typography variant="h6">
									??????????????????
								</Typography>
								<Button
									variant="contained"
									onClick={handleOpenDocumentDialog}
								>
									????????????
								</Button>
								<AddDocumentDialog
									onClose={handleCloseDocumentDialog}
									open={openDocumentDialog}
									mode="edit"
									bukken={bukken}
									loadData={() => reloadDocument(bukken)}
									objectKind={OtherObjectKind.Bukken}
								/>
							</Box>
							<BukkenRelatedDocsListTable
								bukken={bukken}
								bukkenDocs={bukkenDocs}
								deleteDocument={deleteDocument}
							/>
						</CardContent>
					</Card>
					<Card sx={{mt: 4}}>
						<CardContent>
							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'space-between',
									my: 3,
								}}
							>
								<Typography variant="h6">????????????</Typography>
								<Button
									variant="contained"
									onClick={handleOpenHistoryDialog}
								>
									????????????
								</Button>
								<HistoryDialog
									onClose={handleCloseHistoryDialog}
									open={openHistoryDialog}
									mode="edit"
									bukken={bukken}
									loadData={() => reloadHistory(bukken)}
									objectKind={OtherObjectKind.Bukken}
								/>
							</Box>
							<BukkenHistoryListTable
								bukken={bukken}
								bukkenHistory={bukkenHistory}
								deleteHistory={deleteHistory}
							/>
						</CardContent>
						<CardActions>
							<Button
								href="/history"
								endIcon={<ArrowRightIcon fontSize="small" />}
							>
								????????????????????????
							</Button>
						</CardActions>
					</Card>
				</Container>
			</Box>
		</>
	);
};

BukkenDetails.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);
export default BukkenDetails;
