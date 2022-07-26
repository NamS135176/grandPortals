import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { PasswordResettingForm } from '../../../components/profile/password-resetting';
import { gtm } from '../../../lib/gtm';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';

const PasswordReset = () => {
	useEffect(() => {
		gtm.push({ event: 'page_view' });
	}, []);

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜パスワード再設定</title>
			</Head>
			<Box
				component="main"
				sx={{
					backgroundColor: 'background.default',
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth="md">
					<PasswordResettingForm />
				</Container>
			</Box>
		</>
	);
};

PasswordReset.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PasswordReset;
