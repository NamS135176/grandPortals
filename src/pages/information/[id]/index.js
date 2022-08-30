import {useEffect} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Divider,
	Grid,
	Typography,
} from '@mui/material';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {gtm} from '../../../lib/gtm';
import {ArrowLeft as ArrowLeftIcon} from '../../../icons/arrow-left';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {Download as DownloadIcon} from '../../../icons/download';

const InformationDetails = () => {
	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜お知らせ情報</title>
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
						<Typography variant="subtitle2">
							お問い合わせ：050-5443-5974
						</Typography>
					</Box>
					<Card sx={{mt: 4}}>
						<CardContent>
							<Box sx={{mb: 4}}>
								<Grid
									container
									justifyContent="space-between"
									spacing={3}
								>
									<Grid item>
										<Typography variant="h6" mb={3}>
											お知らせ情報
										</Typography>
									</Grid>
								</Grid>
								<Typography>
									XXのキャンペーンのお知らせ
								</Typography>
								<Divider
									sx={{
										mb: 3,
										mt: 3,
									}}
								/>
								<Typography
									color="textSecondary"
									sx={{mt: 1}}
									variant="body2"
								>
									サンプルテキストサンプルテキスト
									サンプルテキストサンプルテキスト
									サンプルテキストサンプルテキスト
									サンプルテキストサンプルテキスト
									サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト
								</Typography>

								<Button
									startIcon={
										<DownloadIcon fontSize="small" />
									}
									sx={{m: 1}}
								>
									資料ダウンロード
								</Button>
							</Box>
							<Box
								sx={{
									backgroundImage: `url(/images/contact/contact.jpeg)`,
									backgroundPosition: 'center',
									backgroundSize: 'cover',
									borderRadius: 1,
									height: 380,
									mt: 3,
								}}
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
						<NextLink href="/information/list" passHref>
							<Button
								endIcon={<ArrowLeftIcon fontSize="small" />}
								variant="outlined"
							>
								戻る
							</Button>
						</NextLink>
					</Box>
				</Container>
			</Box>
		</>
	);
};
InformationDetails.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);

export default InformationDetails;
