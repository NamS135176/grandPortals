import React, {useState} from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableSortLabel,
	TableRow,
	Box,
	Link,
} from '@mui/material';
import {ArrowRight as ArrowRightIcon} from '../../icons/arrow-right';
import {Scrollbar} from '../scrollbar';
import moment from 'moment';
import {SeverityPill} from '../severity-pill';

const applySort = (items, sortDir) =>
	items.sort((a, b) => {
		let newOrder = 0;

		if (a.registeredAt < b.registeredAt) {
			newOrder = -1;
		}

		if (a.registeredAt > b.registeredAt) {
			newOrder = 1;
		}

		return sortDir === 'asc' ? newOrder : -newOrder;
	});

const applyPagination = (items, page, rowsPerPage) =>
	items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

export const InformationListTable = (props) => {
	const {items, ...other} = props;
	const [sort, setSort] = useState('desc');

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	const handleSort = () => {
		setSort((prevOrder) => {
			if (prevOrder === 'asc') {
				return 'desc';
			}

			return 'asc';
		});
	};

	const sortedItems = applySort(items, sort);
	const paginatedItems = applyPagination(sortedItems, page, rowsPerPage);
	console.log('paginatedItems', paginatedItems);

	return (
		<div {...other}>
			<Scrollbar>
				<Table sx={{minWidth: 700}}>
					<TableHead>
						<TableRow>
							<TableCell align="right">参照</TableCell>
							<TableCell>種別</TableCell>
							<TableCell>お知らせ</TableCell>
							<TableCell sortDirection={sort}>
								<TableSortLabel
									active
									direction={sort}
									onClick={handleSort}
								>
									登録日
								</TableSortLabel>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedItems &&
							paginatedItems.map((item) => {
								return (
									<TableRow hover key={item.id}>
										<TableCell align="right">
											<NextLink
												href={`/information/${item.id}`}
												passHref
											>
												<IconButton component="a">
													<ArrowRightIcon fontSize="small" />
												</IconButton>
											</NextLink>
										</TableCell>
										<TableCell>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
												}}
											>
												<SeverityPill
													color={
														(item.type ===
															'お知らせ' &&
															'info') ||
														(item.type ===
															'重要なお知らせ' &&
															'error') ||
														'warning'
													}
												>
													{item.type}
												</SeverityPill>
												{item.type === 'お知らせ' && (
													<Box
														sx={{
															backgroundColor:
																'red',
															borderRadius: '50%',
															height: 16,
															ml: 1,
															width: 16,
														}}
													/>
												)}
											</Box>
										</TableCell>
										<TableCell>
											<NextLink
												href={`/information/${item.id}`}
												passHref
											>
												<Link
													underline="none"
													variant="subtitle2"
												>
													{item.name}
												</Link>
											</NextLink>
										</TableCell>
										<TableCell>
											{moment(item.createdAt).format(
												'YYYY/MM/DD HH:mm'
											)}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</Scrollbar>
			<TablePagination
				component="div"
				count={items?.length}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
				labelRowsPerPage="表示数"
			/>
		</div>
	);
};

InformationListTable.propTypes = {
	items: PropTypes.array.isRequired,
};
