import {useEffect} from 'react';
import Head from 'next/head';
import {Box, Container} from '@mui/material';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {ProfileForm} from '../../../components/profile/profile-form';
import {gtm} from '../../../lib/gtm';
import { useAuth } from 'hooks/use-auth';

const ProfileEdit = () => {
	const { user } = useAuth();

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);
	return (
		user && (
			<>
				<Head>
					<title>grandsポータルサイト｜プロフィール編集</title>
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
						<ProfileForm user={user} mode="edit" />
					</Container>
				</Box>
			</>
		)
	);
};

ProfileEdit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProfileEdit;
