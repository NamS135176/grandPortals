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
	Skeleton,
} from '@mui/material';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {BukkenRelatedDocsListTable} from '../../../components/bukken/bukken-related-docs-list-table';
import {BukkenHistoryListTable} from '../../../components/bukken/bukken-history-list-table';
import {gtm} from '../../../lib/gtm';
import {ManagementList} from '../../../components/management-menu';
import {ArrowLeft as ArrowLeftIcon} from '../../../icons/arrow-left';
import {ArrowRight as ArrowRightIcon} from '../../../icons/arrow-right';
import {HistoryDialog} from '../../../components/history/history-dialog';
import {useRoomDetail} from '../../../hooks/use-room-detail';
import {useRouter} from 'next/router';
import {FileUpload} from '../../../components/widgets/file-upload';
import {RoomKind} from '../../../utils/global-data';
import {AddDocumentDialog} from '../../../components/bukken/add-document-dialog';

const applyPagination = (bukken, page, rowsPerPage) =>
	bukken.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const RoomDetails = () => {
	const router = useRouter();
	const {roomId} = router.query;
	const {
		loading,
		uploadCoverImage,
		room,
		coverImageUrl,
		histories: bukkenHistory,
		documents: bukkenDocs,
		uploadRoomCover,
		deleteHistory,
		deleteDocument,
		updateRoomFieldList,
		reloadHistory,
		reloadDocument,
	} = useRoomDetail(roomId);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [rowsPerPageHistory, setRowsPerPageHistory] = useState(5);
	const [form, setForm] = useState({
		kind: '',
		name: '',
		area: '',
		height: '',
		remarks: '',
	});

	useEffect(() => {
		if (!room?.field_list) return;
		const {kind, name, area, height, remarks} = room.field_list;
		setForm({kind, name, area, height, remarks});
	}, [room]);

	// dialog
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
	// ./dialog

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
		//update other object for update field_list
		const fieldList = room?.field_list ?? {};
		fieldList['kind'] = form.kind;
		fieldList['name'] = form.name;
		fieldList['area'] = form.area;
		fieldList['height'] = form.height;
		fieldList['remarks'] = form.remarks;

		updateRoomFieldList(fieldList);
	};
	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handlePageHistoryChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	const handleRowsPerPageHistoryChange = (event) => {
		setRowsPerPageHistory(parseInt(event.target.value, 10));
	};

	// Usually query is done on backend with indexing solutions
	const paginatedBukkenDocs = applyPagination(bukkenDocs, page, rowsPerPage);
	const paginatedBukkenHistory = applyPagination(
		bukkenHistory,
		page,
		rowsPerPage
	);

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜外装・エクステリア情報</title>
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
						<Typography variant="subtitle2">
							お問い合わせ：0463-79-5564
						</Typography>
					</Box>
					<Card>
						<CardContent>
							<ManagementList />
						</CardContent>
					</Card>
					<Card sx={{mt: 4}}>
						<CardContent>
							<Box sx={{mb: 4}}>
								<Grid
									container
									justifyContent="space-between"
									spacing={3}
								>
									<Grid item sm={4}>
										<CardActionArea href={`/interior/list?room=${roomId}`}>
											<Card
												elevation={0}
												variant="outlined"
												sx={{cursor: 'pointer'}}
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
											{room?.bukken_no
												? `物件番号：${room?.bukken_no}`
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
										>
											画像追加
											<FileUpload
												accept={'image/*'}
												onChange={uploadRoomCover}
												prefix="image"
											>
												<></>
											</FileUpload>
										</Button>
									</Grid>
								</Grid>
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
								/>
							)}

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
										disabled={loading}
										onClick={handleSubmit}
									>
										登録
									</Button>
								</Box>
							</Grid>
						</CardContent>
					</Card>
					<Card sx={{mt: 4}}>
						<CardContent>
							{room ? (
								<>
									<Box
										sx={{
											alignItems: 'center',
											display: 'flex',
											justifyContent: 'space-between',
											mb: 3,
										}}
									>
										<Typography variant="h6">
											関連資料一覧
										</Typography>
										<Button
											variant="contained"
											onClick={handleOpenDocumentDialog}
											disabled={!room?.bukken}
										>
											資料追加
										</Button>
										<AddDocumentDialog
											onClose={handleCloseDocumentDialog}
											open={openDocumentDialog}
											mode="edit"
											bukken={room?.bukken}
											loadData={() =>
												reloadDocument(room)
											}
											otherObjectId={room?.id}
										/>
									</Box>
									<BukkenRelatedDocsListTable
										bukken={room?.bukken}
										bukkenDocs={paginatedBukkenDocs}
										bukkenDocsCount={bukkenDocs.length}
										onPageChange={handlePageChange}
										onRowsPerPageChange={
											handleRowsPerPageChange
										}
										rowsPerPage={rowsPerPage}
										page={page}
										deleteDocument={deleteDocument}
									/>
								</>
							) : (
								<></>
							)}
						</CardContent>
					</Card>
					<Card sx={{mt: 4}}>
						<CardContent>
							{room ? (
								<>
									<Box
										sx={{
											alignItems: 'center',
											display: 'flex',
											justifyContent: 'space-between',
											mb: 3,
										}}
									>
										<Typography variant="h6">
											最新履歴
										</Typography>
										<Button
											variant="contained"
											onClick={handleOpenHistoryDialog}
											disabled={!room?.bukken}
										>
											履歴追加
										</Button>
										<HistoryDialog
											onClose={handleCloseHistoryDialog}
											open={openHistoryDialog}
											mode="edit"
											bukken={room?.bukken}
											loadData={() => reloadHistory(room)}
											otherObjectId={room?.id}
										/>
									</Box>
									<BukkenHistoryListTable
										bukken={room?.bukken}
										bukkenHistory={paginatedBukkenHistory}
										bukkenHistoryCount={
											bukkenHistory.length
										}
										onPageChange={handlePageHistoryChange}
										onRowsPerPageChange={
											handleRowsPerPageHistoryChange
										}
										rowsPerPage={rowsPerPageHistory}
										page={page}
										deleteHistory={deleteHistory}
									/>
								</>
							) : (
								<></>
							)}
						</CardContent>
						<CardActions>
							<Button
								href="/history"
								endIcon={<ArrowRightIcon fontSize="small" />}
							>
								全ての履歴を見る
							</Button>
						</CardActions>
					</Card>
				</Container>
			</Box>
		</>
	);
};
RoomDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RoomDetails;
