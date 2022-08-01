import {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Divider,
	Typography,
} from '@mui/material';
import {bukkenApi} from '../../__fake-api__/bukken-api';
import {DashboardLayout} from '../../components/dashboard/dashboard-layout';
import {EquipmentListTable} from '../../components/equipment/equipment-list-table';
import {useMounted} from '../../hooks/use-mounted';
import {gtm} from '../../lib/gtm';
import {ManagementList} from '../../components/management-menu';

const applyPagination = (bukken, page, rowsPerPage) =>
	bukken.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const EquipmentList = () => {
	const isMounted = useMounted();
	const [equipment, setEquipment] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	const getEquipmentList = useCallback(async () => {
		try {
			const data = await bukkenApi.getEquipmentList();

			if (isMounted()) {
				setEquipment(data);
			}
		} catch (err) {
			console.error(err);
		}
	}, [isMounted]);

	useEffect(
		() => {
			getEquipmentList();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	// Usually query is done on backend with indexing solutions
	const paginatedRoom = applyPagination(equipment, page, rowsPerPage);

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜設備</title>
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
								<Typography variant="h6">設備一覧</Typography>
								<Button variant="contained">新規登録</Button>
							</Box>
							<EquipmentListTable
								equipment={paginatedRoom}
								equipmentCount={equipment.length}
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
EquipmentList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EquipmentList;
