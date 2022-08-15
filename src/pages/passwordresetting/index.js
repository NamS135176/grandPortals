import { useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import { PasswordResettingForm } from '../../components/authentication/password-resetting';
import { AmplifyPasswordReset } from 'components/authentication/amplify-password-reset';
import { gtm } from '../../lib/gtm';
import { MainLayout } from '../../components/main-layout';

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
					<Card elevation={16} sx={{ p: 4 }}>
						<Box
							sx={{
								alignItems: 'center',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
							}}
						>
							<Typography variant="h4">パスワード再設定</Typography>
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								mt: 3,
							}}
						>
							<AmplifyPasswordReset />
						</Box>
						<Divider sx={{ my: 3 }} />
						<Box
							sx={{
								alignItems: 'center',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
							}}
						>
							<NextLink href="/login" passHref>
								<Link color="textSecondary" variant="body2">
									ログイン
								</Link>
							</NextLink>
						</Box>
					</Card>
				</Container>
			</Box>
		</>
	);
};

PasswordReset.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default PasswordReset;