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
import {DashboardLayout} from '../../components/dashboard/dashboard-layout';
import {RoomListTable} from '../../components/room/room-list-table';
import {gtm} from '../../lib/gtm';
import {useRoomList} from '../../hooks/use-room-list';
import {ManagementList} from '../../components/management-menu';
import {useRouter} from 'next/router';
import {AuthGuard} from '../../components/authentication/auth-guard';
import {useBukkenDefault} from 'hooks/use-bukken-default';
import {Friend} from 'react-line-social';

const RoomList = () => {
	const router = useRouter();
	const {bukken} = useBukkenDefault();

	const {roomList: rooms, deleteRoom} = useRoomList(bukken?.id);

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

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
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'space-between',
									mb: 3,
								}}
							>
								<Typography variant="h6">
									部屋・スペース一覧
								</Typography>
								<Button
									onClick={() => {
										router.push('/room/create');
									}}
									variant="contained"
								>
									新規登録
								</Button>
							</Box>
							<RoomListTable
								items={rooms}
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
RoomList.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);

export default RoomList;
