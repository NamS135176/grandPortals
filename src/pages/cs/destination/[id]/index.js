import {useEffect, useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
	Box,
	Button,
	Card,
	Container,
	Divider,
	Typography,
	TextField,
	CardContent,
} from '@mui/material';
import {DashboardLayout} from '../../../../components/dashboard/dashboard-layout';
import {CsDestinationListTable} from '../../../../components/information/cs-destination-list-table';
import {gtm} from '../../../../lib/gtm';
import {AuthGuard} from '../../../../components/authentication/auth-guard';
import {bukkenApi} from '__fake-api__/bukken-api';
import { useAuth } from 'hooks/use-auth';
import { useDestinationList } from 'hooks/use-destination-list';
import { useRouter } from 'next/router';




const CsDestinationList = () => {
	const router = useRouter()
	const [items, setItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [filters, setFilters] = useState({
		email: '',
		name: '',
	});
	const {id} = router.query
	const {destinations:list, filterDestination, loading} = useDestinationList(id)

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	const handleChange = (event) => {
		setFilters({
			...filters,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		filterDestination(filters)
		// const filteredItems = applyFilters(items, filters);
		// setFilteredItems(filteredItems);
	};

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜お知らせ送信先一覧（CS）</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: {xs: 4, md: 8},
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
					<Card>
						<CardContent>
							<Typography variant="h6">お知らせ送信先一覧</Typography>

							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									flexWrap: 'wrap',
									p: 3,
								}}
								component="form"
								onSubmit={handleSubmit}
							>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										pr: 2,
									}}
								>
									<Typography sx={{pr: 2}}>
										メールアドレス
									</Typography>
									<TextField
										label="メールアドレス"
										name="email"
										onChange={handleChange}
										value={filters.email}
									/>
								</Box>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										pr: 2,
									}}
								>
									<Typography sx={{pr: 2}}>氏名</Typography>
									<TextField
										label="氏名"
										name="name"
										onChange={handleChange}
										value={filters.name}
									/>
								</Box>
								<Button type="submit" variant="contained">
									検索
								</Button>
							</Box>
							<Divider />
							{list?.length > 0 && (
								<CsDestinationListTable items={list} />
							)}
						</CardContent>
					</Card>
					<Box
						sx={{
							mx: -1,
							mb: -1,
							mt: 3,
						}}
					>
						<NextLink href={`/cs/information/${id}`} passHref>
							<Button sx={{m: 1}} variant="contained">
							戻る
							</Button>
						</NextLink>
					</Box>
				</Container>
			</Box>
		</>
	);
};
CsDestinationList.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);

export default CsDestinationList;
