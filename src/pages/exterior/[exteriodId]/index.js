import {useCallback, useEffect, useState} from 'react';
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
} from '@mui/material';
import {bukkenApi} from '../../../__fake-api__/bukken-api';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {BukkenRelatedDocsListTable} from '../../../components/bukken/bukken-related-docs-list-table';
import {BukkenHistoryListTable} from '../../../components/bukken/bukken-history-list-table';
import {useMounted} from '../../../hooks/use-mounted';
import {gtm} from '../../../lib/gtm';
import {ManagementList} from '../../../components/management-menu';
import {ArrowLeft as ArrowLeftIcon} from '../../../icons/arrow-left';
import {ArrowRight as ArrowRightIcon} from '../../../icons/arrow-right';
import {HistoryDialog} from '../../../components/history/history-dialog';
import {DocsDialog} from '../../../components/documents/docs-dialog';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {Friend} from 'react-line-social';

const applyPagination = (bukken, page, rowsPerPage) =>
	bukken.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const ExteriorDetails = () => {
	const isMounted = useMounted();
	const [bukkenDocs, setBukkenDocs] = useState([]);
	const [bukkenHistory, setBukkenHistory] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [rowsPerPageHistory, setRowsPerPageHistory] = useState(5);
	const [form, setForm] = useState({
		type: 'ブロック塀',
		name: 'ブロック塀A',
		details: 'テキストサンプルテキストサンプルテキストサンプル',
		note: 'テキストサンプルテキストサンプルテキストサンプル',
		date: new Date(),
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

	const handleDateChange = (date) => {
		setForm({...form, date: date});
	};

	// History dialog
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => {
		setOpenDialog(true);
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	// Docs dialog
	const [openDocsDialog, setOpenDocsDialog] = useState(false);
	const handleOpenDocsDialog = () => {
		setOpenDocsDialog(true);
	};
	const handleCloseDocsDialog = () => {
		setOpenDocsDialog(false);
	};

	const getRelatedDocs = useCallback(async () => {
		try {
			const data = await bukkenApi.getRelatedDocs();

			if (isMounted()) {
				setBukkenDocs(data);
			}
		} catch (err) {
			console.error(err);
		}
	}, [isMounted]);

	const getHistory = useCallback(async () => {
		try {
			const data = await bukkenApi.getHistory();

			if (isMounted()) {
				setBukkenHistory(data);
			}
		} catch (err) {
			console.error(err);
		}
	}, [isMounted]);

	useEffect(
		() => {
			getRelatedDocs();
			getHistory();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

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
						</CardContent>
					</Card>
					<Card sx={{mt: 4}}>
						<CardContent>
							<Box
								sx={{
									mb: 4,
									display: 'flex',
									justifyContent: 'flex-end',
								}}
							>
								<Typography variant="subtitle2">
									物件番号：HONR000001
								</Typography>
							</Box>
							<Box sx={{mb: 4}}>
								<Grid
									container
									justifyContent="space-between"
									spacing={3}
								>
									<Grid item>
										<Typography variant="h6" mb={3}>
											外装・エクステリア情報
										</Typography>
									</Grid>
									<Grid item>
										<Button variant="contained">
											画像追加
										</Button>
									</Grid>
								</Grid>
							</Box>

							<Box
								sx={{
									backgroundImage: `url(/images/mock-images/covers/cover_1.jpg)`,
									backgroundPosition: 'center',
									backgroundSize: 'cover',
									borderRadius: 1,
									height: 450,
									mt: 3,
								}}
							/>
							<Grid container spacing={3} mt={3}>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										label="種別"
										name="type"
										required
										value={form.type}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										label="名称"
										name="name"
										required
										value={form.name}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										multiline
										minRows={4}
										label="施工内容"
										name="details"
										value={form.details}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										multiline
										minRows={4}
										label="備考"
										name="note"
										value={form.note}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<DesktopDatePicker
										label="最終施工日"
										inputFormat="yyyy/MM/dd"
										value={form.date}
										onChange={handleDateChange}
										renderInput={(inputProps) => (
											<TextField
												fullWidth
												{...inputProps}
											/>
										)}
									/>
								</Grid>
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
									関連資料一覧
								</Typography>
								<Button
									variant="contained"
									onClick={handleOpenDocsDialog}
								>
									資料追加
								</Button>
								<DocsDialog
									onClose={handleCloseDocsDialog}
									open={openDocsDialog}
								/>
							</Box>
							<BukkenRelatedDocsListTable
								bukkenDocs={paginatedBukkenDocs}
								bukkenDocsCount={bukkenDocs.length}
								onPageChange={handlePageChange}
								onRowsPerPageChange={handleRowsPerPageChange}
								rowsPerPage={rowsPerPage}
								page={page}
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
								<Typography variant="h6">最新履歴</Typography>
								<Button
									variant="contained"
									onClick={handleOpenDialog}
								>
									履歴追加
								</Button>
								<HistoryDialog
									onClose={handleCloseDialog}
									open={openDialog}
									mode="edit"
								/>
							</Box>
							<BukkenHistoryListTable
								bukkenHistory={paginatedBukkenHistory}
								bukkenHistoryCount={bukkenHistory.length}
								onPageChange={handlePageHistoryChange}
								onRowsPerPageChange={
									handleRowsPerPageHistoryChange
								}
								rowsPerPage={rowsPerPageHistory}
								page={page}
							/>
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
					<Box
						sx={{
							mx: -1,
							mb: -1,
							mt: 3,
						}}
					>
						<Button
							endIcon={<ArrowLeftIcon fontSize="small" />}
							variant="outlined"
						>
							戻る
						</Button>
						<Button sx={{m: 1}} variant="contained">
							登録
						</Button>
					</Box>
				</Container>
			</Box>
		</>
	);
};
ExteriorDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ExteriorDetails;
