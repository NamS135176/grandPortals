import {useCallback, useEffect, useMemo, useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Divider,
	Typography,
} from '@mui/material';
import {DashboardLayout} from '../../components/dashboard/dashboard-layout';
import {gtm} from '../../lib/gtm';
import {ManagementList} from '../../components/management-menu';
import PropTypes from 'prop-types';
import {useOtherObjectList} from '../../hooks/use-other-object-list';
import {OtherObjectListTable} from './other-object-list-table';
import {useBukkenDefault} from '../../hooks/use-bukken-default';
import {
	getKindCaption,
	getOtherObjectRouteUrl,
	OtherObjectKind,
} from '../../utils/bukken';
import {Friend} from 'react-line-social';

const OtherObjectList = ({otherObjectKind}) => {
	const {bukken} = useBukkenDefault();
	const {otherObjects, deleteObject} = useOtherObjectList(
		bukken?.id,
		otherObjectKind
	);

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	const kindCaption = useMemo(() => {
		return getKindCaption(otherObjectKind);
	}, [otherObjectKind]);

	const route = useMemo(() => {
		return getOtherObjectRouteUrl(otherObjectKind);
	}, [otherObjectKind]);

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜{kindCaption}</title>
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
						<Box>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
								}}
							>
								<Friend lineid="@487rrtrg" locale="ja" />
							</Box>
							<Typography variant="subtitle2">
								お問い合わせ：050-5443-5974
							</Typography>
						</Box>
					</Box>
					<Card>
						<CardContent>
							<ManagementList />
						</CardContent>
					</Card>
					<Card sx={{mt: 4}}>
						<CardContent>
							<Box
								sx={{
									alignItems: {sx: 'start', md: 'center'},
									display: 'flex',
									justifyContent: {
										sx: 'start',
										md: 'space-between',
									},
									flexDirection: {
										xs: 'column',
										md: 'row',
									},
									mb: 3,
								}}
							>
								<Typography variant="h6">
									{kindCaption}一覧
								</Typography>
								<Box>
									<NextLink
										href={`${route}/normal/create`}
										passHref
									>
										<Button
											variant="contained"
											sx={{
												mr: {xs: 0, md: 2},
												mb: {xs: 1, md: 0},
												float: {
													xs: 'right',
													md: 'none',
												},
											}}
										>
											既製品新規登録
										</Button>
									</NextLink>
									<NextLink
										href={`${route}/order/create`}
										passHref
									>
										<Button
											variant="contained"
											sx={{
												float: {
													xs: 'right',
													md: 'none',
												},
											}}
										>
											オーダー製品新規登録
										</Button>
									</NextLink>
								</Box>
							</Box>
							<OtherObjectListTable
								items={otherObjects}
								deleteObject={deleteObject}
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
						<NextLink href="/" passHref>
							<Button sx={{m: 1}} variant="contained">
								TOP
							</Button>
						</NextLink>
					</Box>
				</Container>
			</Box>
		</>
	);
};

OtherObjectList.propTypes = {
	otherObjectKind: PropTypes.string,
};
export default OtherObjectList;
