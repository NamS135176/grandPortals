import {useEffect, useState, useCallback} from 'react';
import Head from 'next/head';
import {Box, Container} from '@mui/material';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {ProfileForm} from '../../../components/profile/profile-form';
import {gtm} from '../../../lib/gtm';
import {useMounted} from '../../../hooks/use-mounted';
import {bukkenApi} from '../../../__fake-api__/bukken-api';

const ProfileEdit = () => {
	const isMounted = useMounted();
	const [user, setUser] = useState(null);

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	const getUser = useCallback(async () => {
		try {
			const data = await bukkenApi.getUser();

			if (isMounted()) {
				setUser(data);
			}
		} catch (err) {
			console.error(err);
		}
	}, [isMounted]);

	useEffect(
		() => {
			getUser();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

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
