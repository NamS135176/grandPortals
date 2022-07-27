import { useCallback, useEffect, useState } from 'react';
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
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { RoomListTable } from '../../components/room/room-list-table';
import { useMounted } from '../../hooks/use-mounted';
import { gtm } from '../../lib/gtm';
import { useRoomList } from '../../hooks/use-room-list';
import { ManagementList } from '../../components/management-menu';
import { useRouter } from 'next/router';
const applyPagination = (bukken, page, rowsPerPage) =>
	bukken.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const RoomList = () => {
	const router = useRouter()
	const {bukkenId} = router.query
	
	const {roomList : rooms, deleteRoom} = useRoomList(bukkenId)
	console.log(rooms);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	useEffect(() => {
		gtm.push({ event: 'page_view' });
	}, []);

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	// Usually query is done on backend with indexing solutions
	const paginatedRoom = applyPagination(rooms, page, rowsPerPage);

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜部屋・スペース</title>
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
							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'space-between',
									my: 3,
								}}
							>
								<Typography variant="h6">部屋・スペース一覧</Typography>
								<Button onClick={() => {router.push('/room/create')}} variant="contained">新規登録</Button>
							</Box>
							<RoomListTable
								room={paginatedRoom}
								roomCount={rooms.length}
								onPageChange={handlePageChange}
								onRowsPerPageChange={handleRowsPerPageChange}
								rowsPerPage={rowsPerPage}
								page={page}
								deleteRoom={deleteRoom}
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
RoomList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RoomList;
