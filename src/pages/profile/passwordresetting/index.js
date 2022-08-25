import {useEffect, useState} from 'react';
import Head from 'next/head';
import {Box, Container} from '@mui/material';
import {PasswordResettingForm} from '../../../components/profile/password-resetting';
import {gtm} from '../../../lib/gtm';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import { use } from 'i18next';
import { Auth } from 'aws-amplify';

const PasswordReset = () => {
	const [username, setUsername] = useState();
	useEffect(() => {
		gtm.push({event: 'page_view'});
		Auth.currentAuthenticatedUser()
		.then((user) => {
			setUsername(user.username)
		})
		.catch((err) => {
			console.log(err);
			router.push('/login')
		});
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
					py: {xs: 4, md: 8},
				}}
			>
				<Container maxWidth="md">
					<PasswordResettingForm username={username} />
				</Container>
			</Box>
		</>
	);
};

PasswordReset.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PasswordReset;
