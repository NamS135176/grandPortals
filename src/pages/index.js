import {useEffect, useState} from 'react';
import Head from 'next/head';
import {Box, Container} from '@mui/material';
import {DashboardLayout} from '../components/dashboard/dashboard-layout';
import {BukkenRegistInfoTable} from '../components/top/bukken-regist-info-table';
import {BukkenSearchInfoTable} from '../components/top/bukken-search-info-table';
import {gtm} from '../lib/gtm';

const Top = () => {
	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜TOP</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: {xs: 4, md: 8},
				}}
			>
				<Container maxWidth="xl">
					<BukkenRegistInfoTable />
					<BukkenSearchInfoTable />
				</Container>
			</Box>
		</>
	);
};
Top.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Top;
