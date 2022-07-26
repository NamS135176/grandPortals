import {useEffect} from 'react';
import Head from 'next/head';
import {Box, Container, Typography, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {gtm} from '../lib/gtm';

const NotFound = () => {
	const theme = useTheme();
	const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	return (
		<>
			<Head>
				<title>ページが見つかりませんでした。</title>
			</Head>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					minHeight: '100%',
					px: 3,
					py: '80px',
				}}
			>
				<Container maxWidth="lg">
					<Typography
						align="center"
						color="textPrimary"
						variant={mobileDevice ? 'h3' : 'h1'}
					>
						404
					</Typography>
					<Typography
						align="center"
						color="textPrimary"
						variant={mobileDevice ? 'h4' : 'h3'}
					>
						ページが見つかりませんでした。
					</Typography>
					<Typography
						align="center"
						color="textSecondary"
						sx={{mt: 0.5}}
						variant="subtitle2"
					>
						リクエストされたページは見つかりませんでした。
					</Typography>
				</Container>
			</Box>
		</>
	);
};

export default NotFound;
