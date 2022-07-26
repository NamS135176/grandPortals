import { useEffect } from 'react';
import {
	Box,
	Container,
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
} from '@mui/material';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import Head from 'next/head';
import { gtm } from '../../../../grands-bukken-confirm/src/lib/gtm';
import NextLink from 'next/link';

const Leave = () => {
	useEffect(() => {
		gtm.push({ event: 'page_view' });
	}, []);

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜退会完了</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth="md">
					<Box sx={{ mb: 4 }}>
						<Typography variant="h4">退会完了</Typography>
					</Box>
					<Card>
						<CardContent>
							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<Typography variant="h6">退会手続きが完了しました。</Typography>
								<Typography
									color="textSecondary"
									sx={{ mt: 1, textAlign: 'center' }}
									variant="body2"
								>
									「XXXX」を利用いただき誠にありがとうございました。
									<br />
									またのご利用を、心よりお待ちしております。
								</Typography>
							</Box>
						</CardContent>
						<CardActions sx={{ m: -1 }}>
							<NextLink href="/login" passHref>
								<Button sx={{ m: 1, mr: 'auto' }} variant="contained">
									Topに戻る
								</Button>
							</NextLink>
						</CardActions>
					</Card>
				</Container>
			</Box>
		</>
	);
};

Leave.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Leave;
