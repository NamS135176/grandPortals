import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
	Box,
	Button,
	Card,
	Container,
	Divider,
	Grid,
	Typography,
} from '@mui/material';
import { bukkenApi } from '../../__fake-api__/bukken-api';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { BukkenListTable } from '../../components/bukken/bukken-list-table';
import { useMounted } from '../../hooks/use-mounted';
import { gtm } from '../../lib/gtm';
import { useBukkenList } from '../../hooks/use-bukken-list';
import { AuthGuard } from '../../components/authentication/auth-guard';

const applyPagination = (bukken, page, rowsPerPage) =>
	bukken.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const BukkenList = () => {
	const { bukkenList: bukken } = useBukkenList();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	useEffect(() => {
		gtm.push({ event: 'page_view' });
	}, []);

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	// Usually query is done on backend with indexing solutions
	const paginatedbukken = applyPagination(bukken, page, rowsPerPage);

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜物件</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth="xl">
					<Box sx={{ mb: 4 }}>
						<Grid container justifyContent="space-between" spacing={3}>
							<Grid item>
								<Typography variant="h4">物件一覧</Typography>
							</Grid>
							<Grid item>
								<Typography variant="subtitle2">
									お問い合わせ：0463-79-5564
								</Typography>
							</Grid>
						</Grid>
					</Box>
					<Card>
						<Divider />
						<BukkenListTable
							bukken={paginatedbukken}
							bukkenCount={bukken.length}
							onPageChange={handlePageChange}
							onRowsPerPageChange={handleRowsPerPageChange}
							rowsPerPage={rowsPerPage}
							page={page}
						/>
					</Card>
					<Box
						sx={{
							mx: -1,
							mb: -1,
							mt: 3,
						}}
					>
						<NextLink href="/" passHref>
							<Button sx={{ m: 1 }} variant="contained">
								TOP
							</Button>
						</NextLink>
					</Box>
				</Container>
			</Box>
		</>
	);
};
BukkenList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default BukkenList;
