import { useCallback, useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Divider,
	Grid,
	Typography,
	TextField,
	InputAdornment,
} from '@mui/material';
import { bukkenApi } from '../../__fake-api__/bukken-api';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { HistoryListTable } from '../../components/history/history-list-table';
import { useMounted } from '../../hooks/use-mounted';
import { gtm } from '../../lib/gtm';
import { ManagementList } from '../../components/management-menu';
import { Search as SearchIcon } from '../../icons/search';

const sortOptions = [
	{
		label: '外装',
		value: '外装',
	},
	{
		label: '部屋',
		value: '部屋',
	},
	{
		label: '建具（既製品）',
		value: '建具（既製品）',
	},
	{
		label: '建具（オーダー品）',
		value: '建具（オーダー品）',
	},
	{
		label: '物件',
		value: '物件',
	},
	{
		label: '全て',
		value: '',
	},
];

const applyFilters = (histories, filters) =>
	histories.filter((history) => {
		if (filters.name) {
			const nameMatched = history.name
				.toLowerCase()
				.includes(filters.name.toLowerCase());

			if (!nameMatched) {
				return false;
			}
		}

		// It is possible to select multiple category options
		if (filters.type) {
			const typeMatched = history.type
				.toLowerCase()
				.includes(filters.type.toLowerCase());

			if (!typeMatched) {
				return false;
			}
		}

		return true;
	});

const applyPagination = (bukken, page, rowsPerPage) =>
	bukken.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const HistoryList = () => {
	const isMounted = useMounted();
	const [bukkenHistory, setBukkenHistory] = useState([]);
	const [filteredHistory, setFilteredHistory] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [filters, setFilters] = useState({
		name: '',
		type: '',
	});

	useEffect(() => {
		gtm.push({ event: 'page_view' });
	}, []);

	const getHistory = useCallback(async () => {
		try {
			const data = await bukkenApi.getHistoryList();

			if (isMounted()) {
				setBukkenHistory(data);
				setFilteredHistory(data);
			}
		} catch (err) {
			console.error(err);
		}
	}, [isMounted]);

	useEffect(
		() => {
			getHistory();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const handleChange = (event) => {
		setFilters({
			...filters,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const filteredHistory = applyFilters(bukkenHistory, filters);
		setFilteredHistory(filteredHistory);
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	// Usually query is done on backend with indexing solutions
	const paginatedBukkenHistory = applyPagination(
		filteredHistory,
		page,
		rowsPerPage
	);

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜履歴</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth="xl">
					<Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
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
							<Grid container justifyContent="space-between" spacing={3}>
								<Grid item>
									<Typography variant="h6" mb={3}>
										履歴一覧
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="subtitle2">
										物件番号：HONR000001
									</Typography>
								</Grid>
							</Grid>

							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									flexWrap: 'wrap',
									p: 3,
								}}
								component="form"
								onSubmit={handleSubmit}
							>
								<TextField
									sx={{ pr: 2 }}
									name="name"
									value={filters.name}
									onChange={handleChange}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SearchIcon fontSize="small" />
											</InputAdornment>
										),
									}}
									placeholder="検索"
								/>
								<TextField
									sx={{ pr: 2 }}
									name="type"
									onChange={handleChange}
									select
									SelectProps={{ native: true }}
									value={filters.type}
								>
									{sortOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</TextField>
								<Button type="submit" variant="contained">
									検索
								</Button>
							</Box>
							<HistoryListTable
								bukkenHistory={paginatedBukkenHistory}
								bukkenHistoryCount={bukkenHistory.length}
								onPageChange={handlePageChange}
								onRowsPerPageChange={handleRowsPerPageChange}
								rowsPerPage={rowsPerPage}
								page={page}
							/>
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
							<Button sx={{ m: 1 }} variant="contained">
								TOP
							</Button>
						</NextLink>
					</Box>
				</Container>
			</Box>
		</>
	);
};
HistoryList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default HistoryList;
