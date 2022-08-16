import {useEffect} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {Box, Card, Container, Divider, Link, Typography} from '@mui/material';
import {AmplifyLogin} from '../../components/authentication/amplify-login';
import {MainLayout} from '../../components/main-layout';
import {gtm} from '../../lib/gtm';

const Login = () => {
	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜ログイン</title>
			</Head>
			<Box
				component="main"
				sx={{
					backgroundColor: 'background.default',
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
				}}
			>
				<Container
					maxWidth="sm"
					sx={{
						py: {
							xs: '60px',
							md: '120px',
						},
					}}
				>
					<Card elevation={16} sx={{p: 4}}>
						<Typography variant="h4" align="center">
							ログイン
						</Typography>
						<Box
							sx={{
								flexGrow: 1,
								mt: 3,
							}}
						>
							<AmplifyLogin />
						</Box>
						<Divider sx={{my: 3}} />
						<Box
							sx={{
								alignItems: 'center',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
							}}
						>
							<NextLink
								href="https://grands.co.jp/privacy"
								passHref
							>
								<Link color="textSecondary" variant="body2" underline='always'>
									プライバシーポリシー
								</Link>
							</NextLink>
							<Box sx={{mt: 1}}>
								<NextLink href="/passwordreset" passHref>
									<Link color="textSecondary" variant="body2" underline='always'>
										パスワードをお忘れの方はこちら
									</Link>
								</NextLink>
							</Box>
						</Box>
					</Card>
				</Container>
			</Box>
		</>
	);
};

Login.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Login;
