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
} from '@mui/material';
import {DashboardLayout} from '../../components/dashboard/dashboard-layout';
import {InformationListTable} from '../../components/information/information-list-table';
import {gtm} from '../../lib/gtm';
import {AuthGuard} from '../../components/authentication/auth-guard';
import {bukkenApi} from '__fake-api__/bukken-api';

const InformationList = () => {
	const [items, setItems] = useState([]);

	useEffect(async () => {
		try {
			const data = await bukkenApi.getInformationList();
			setItems(data);
		} catch (err) {
			console.error(err);
		}
	}, []);

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜お知らせ</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: {xs: 4, md: 8},
				}}
			>
				<Container maxWidth="xl">
					<Box sx={{mb: 4}}>
						<Grid
							container
							justifyContent="space-between"
							spacing={3}
						>
							<Grid item>
								<Typography variant="h4">
									お知らせ一覧
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant="subtitle2">
									お問い合わせ：050-5443-5974
								</Typography>
							</Grid>
						</Grid>
					</Box>
					<Card>
						<Divider />
						{items.length > 0 && (
							<InformationListTable items={items} />
						)}
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
InformationList.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);

export default InformationList;
