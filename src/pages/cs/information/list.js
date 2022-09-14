import {useEffect, useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
	Box,
	Button,
	Card,
	Container,
	Divider,
	Grid,
	Typography,
	TextField,
	CardContent,
} from '@mui/material';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {CsInformationListTable} from '../../../components/information/cs-information-list-table';
import {gtm} from '../../../lib/gtm';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {DateTimePicker} from '@mui/lab';
import {useInformationList} from 'hooks/use-information-list';
import toast from 'react-hot-toast';
import {Friend} from 'react-line-social';

const sortOptions = [
	{
		label: '全て',
		value: '全て',
	},
	{
		label: '下書き',
		value: '下書き',
	},
	{
		label: '送信予定',
		value: '送信予定',
	},
	{
		label: '送信済',
		value: '送信済',
	},
];

const applyFilters = (items, filters) =>
	items.filter((item) => {
		if (filters.name) {
			const nameMatched = item.name
				.toLowerCase()
				.includes(filters.name.toLowerCase());

			if (!nameMatched) {
				return false;
			}
		}

		// It is possible to select multiple category options
		if (filters.status) {
			const statusMatched = item.status
				.toLowerCase()
				.includes(filters.status.toLowerCase());

			if (!statusMatched) {
				return false;
			}
		}

		return true;
	});

const CsInformationList = () => {
	const {
		informationList: list,
		filterInformationSendList,
		filterDateInformationSendList,
		deleteInformation,
		page,
		setPage,
	} = useInformationList();
	console.log(list);
	const [items, setItems] = useState([]);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [filteredItems, setFilteredItems] = useState(list);
	const [filters, setFilters] = useState({
		status: '全て',
		startDate: null,
		endDate: null,
	});

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	const handleChange = (event) => {
		setFilters({
			...filters,
			[event.target.name]: event.target.value,
		});
		// filterInformationSendList(event.target.value)
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		filterDateInformationSendList(startDate, endDate, filters.status);
	};

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜お知らせ一覧（CS）</title>
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
							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<Typography variant="h6">
									お知らせ一覧
								</Typography>
								<NextLink
									href="/cs/information/create"
									passHref
								>
									<Button variant="contained">
										新規登録
									</Button>
								</NextLink>
							</Box>
							<Box
								sx={{p: 3}}
								component="form"
								onSubmit={handleSubmit}
							>
								<Grid
									container
									spacing={3}
									alignItems="center"
									mb={2}
								>
									<Grid item md={1} xs={12}>
										<Typography>ステータス</Typography>
									</Grid>
									<Grid item md={2} xs={12}>
										<TextField
											fullWidth
											name="status"
											onChange={handleChange}
											select
											SelectProps={{native: true}}
											value={filters.status}
										>
											{sortOptions.map((option) => (
												<option
													key={option.value}
													value={option.value}
												>
													{option.label}
												</option>
											))}
										</TextField>
									</Grid>
								</Grid>
								<Grid container spacing={3} alignItems="center">
									<Grid item md={1} xs={12}>
										{' '}
										<Typography sx={{pr: 2}}>
											送信時間
										</Typography>
									</Grid>
									<Grid item md={10} xs={12}>
										<Box
											sx={{
												alignItems: {
													xs: 'start',
													md: 'center',
												},
												display: 'flex',
												flexDirection: {
													xs: 'column',
													md: 'row',
												},
											}}
										>
											<DateTimePicker
												inputFormat="yyyy/MM/dd HH:mm"
												onChange={(newDate) => {
													if (
														endDate &&
														newDate > endDate
													) {
														toast.error(
															'送信日時（To）には送信日時（From）より後の日付を指定してください。'
														);
													} else {
														setStartDate(newDate);
													}
												}}
												label="送信日時（From）"
												renderInput={(inputProps) => (
													<TextField
														{...inputProps}
													/>
												)}
												value={startDate}
											/>
											<Box component="span">
												&nbsp;&nbsp;〜&nbsp;&nbsp;
											</Box>
											<DateTimePicker
												inputFormat="yyyy/MM/dd HH:mm"
												onChange={(newDate) => {
													if (
														startDate &&
														newDate < startDate
													) {
														toast.error(
															'送信日時（To）には送信日時（From）より後の日付を指定してください。'
														);
													} else {
														setEndDate(newDate);
													}
													// setEndDate(newDate)
												}}
												label="送信日時（To）"
												renderInput={(inputProps) => (
													<TextField
														{...inputProps}
													/>
												)}
												value={endDate}
											/>
											<Button
												sx={{ml: 2}}
												type="submit"
												variant="contained"
											>
												検索
											</Button>
										</Box>
									</Grid>
								</Grid>
							</Box>
							<Divider />
							{list.length > 0 && (
								<CsInformationListTable
									page={page}
									setPage={setPage}
									deleteInformation={deleteInformation}
									items={list}
								/>
							)}
						</CardContent>
					</Card>
					<Box
						sx={{
							mx: -1,
							mb: -1,
							mt: 3,
						}}
					>
						<NextLink href="/" passHref>
							<Button sx={{m: 1}} variant="contained">
								TOP
							</Button>
						</NextLink>
					</Box>
				</Container>
			</Box>
		</>
	);
};
CsInformationList.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);

export default CsInformationList;
