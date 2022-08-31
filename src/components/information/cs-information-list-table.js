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
} from '@mui/material';
import {ArrowRight as ArrowRightIcon} from '../../icons/arrow-right';
import {Scrollbar} from '../scrollbar';
import moment from 'moment';
import {SeverityPill} from '../severity-pill';
import {Trash as TrashIcon} from '../../icons/trash';
import {Image as ImageIcon} from '../../icons/image';

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

export const CsInformationListTable = (props) => {
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
							<TableCell align="right" />
							<TableCell>ステータス</TableCell>
							<TableCell>種別</TableCell>
							<TableCell align="left" />
							<TableCell>お知らせ概要</TableCell>
							<TableCell sortDirection={sort}>
								<TableSortLabel
									active
									direction={sort}
									onClick={handleSort}
								>
									送信（予定）日時
								</TableSortLabel>
							</TableCell>
							<TableCell sortDirection={sort}>
								<TableSortLabel
									active
									direction={sort}
									onClick={handleSort}
								>
									登録日
								</TableSortLabel>
							</TableCell>
							<TableCell alignt="left">削除</TableCell>
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
										<TableCell>{item.status}</TableCell>
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
											</Box>
										</TableCell>
										<TableCell align="left">
											{item.url ? (
												<Box
													sx={{
														alignItems: 'center',
														backgroundColor:
															'background.default',
														backgroundImage: `url(${item.url})`,
														backgroundPosition:
															'center',
														backgroundSize: 'cover',
														borderRadius: 1,
														display: 'flex',
														height: 80,
														justifyContent:
															'center',
														overflow: 'hidden',
														width: 80,
													}}
												/>
											) : (
												<Box
													sx={{
														alignItems: 'center',
														backgroundColor:
															'background.default',
														borderRadius: 1,
														display: 'flex',
														height: 80,
														justifyContent:
															'center',
														width: 80,
													}}
												>
													<ImageIcon fontSize="small" />
												</Box>
											)}
										</TableCell>
										<TableCell>{item.name}</TableCell>
										<TableCell>
											{item.sendAt &&
												moment(item.sendAt).format(
													'YYYY/MM/DD HH:mm'
												)}
										</TableCell>
										<TableCell>
											{moment(item.registeredAt).format(
												'YYYY/MM/DD HH:mm'
											)}
										</TableCell>
										<TableCell align="left">
											<NextLink href="/bukken/1" passHref>
												<IconButton
													component="a"
													color="error"
												>
													<TrashIcon fontSize="small" />
												</IconButton>
											</NextLink>
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

CsInformationListTable.propTypes = {
	items: PropTypes.array.isRequired,
};
