import {useState} from 'react';
import {useRouter} from 'next/router';
import {
	Box,
	Container,
	Card,
	CardContent,
	CardActions,
	Typography,
	Avatar,
	Button,
} from '@mui/material';
import {DashboardLayout} from '../../components/dashboard/dashboard-layout';
import {ConfirmationDialog} from '../../components/withdrawal/confirmation-dialog';
import Head from 'next/head';
import {alpha} from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';

const Withdrawal = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async () => {
		// API request
		const returnUrl = '/leave';
		router.push(returnUrl).catch(console.error);
	};

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜退会</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: {xs: 4, md: 8},
				}}
			>
				<Container maxWidth="md">
					<Box sx={{mb: 4}}>
						<Typography variant="h4">退会</Typography>
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
								<Avatar
									variant="rounded"
									sx={{
										backgroundColor: (theme) =>
											alpha(
												theme.palette.error.main,
												0.1
											),
										color: 'error.main',
										mr: 1,
									}}
								>
									<WarningIcon fontSize="small" />
								</Avatar>
								<Typography variant="h6" sx={{mt: 2}}>
									退会すると現在ログイン中のアカウントは利用できなくなります。
								</Typography>
								<Typography
									color="textSecondary"
									sx={{mt: 1}}
									variant="body2"
								>
									退会される方は、下記の「退会する」ボタンをクリックしてください
								</Typography>
							</Box>
						</CardContent>
						<CardActions sx={{m: -1}}>
							<Button
								component="a"
								sx={{m: 1}}
								variant="outlined"
								onClick={() => router.back()}
							>
								戻る
							</Button>
							<Button
								sx={{m: 1, mr: 'auto'}}
								variant="contained"
								onClick={handleOpen}
							>
								退会する
							</Button>
						</CardActions>
					</Card>
				</Container>
			</Box>
			<ConfirmationDialog
				open={open}
				onClose={handleClose}
				onSubmit={handleSubmit}
			/>
		</>
	);
};

Withdrawal.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Withdrawal;
