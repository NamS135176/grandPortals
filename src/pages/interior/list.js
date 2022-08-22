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
import {InteriorListTable} from '../../components/interior/interior-list-table';
import {gtm} from '../../lib/gtm';
import {ManagementList} from '../../components/management-menu';
import {useInteriorList} from '../../hooks/use-interior-list';
import {useRoomDefault} from '../../hooks/use-room-default';
import {AuthGuard} from '../../components/authentication/auth-guard';

const InteriorList = () => {
	const {room} = useRoomDefault();

	const {interiors: interior, deleteInterior} = useInteriorList(room?.id);

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜建具・収納</title>
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
							お問い合わせ：050-5443-5974
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
								<Typography variant="h6">
									建具・収納一覧
								</Typography>
								<Box>
									<NextLink
										href={`/interior/normal/create`}
										passHref
									>
										<Button
											variant="contained"
											sx={{mr: 2}}
										>
											既製品新規登録
										</Button>
									</NextLink>
									<NextLink
										href={`/interior/order/create`}
										passHref
									>
										<Button variant="contained">
											オーダー製品新規登録
										</Button>
									</NextLink>
								</Box>
							</Box>
							<InteriorListTable
								items={interior}
								deleteInterior={deleteInterior}
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
InteriorList.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);

export default InteriorList;
