import React, { useState } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {
	Box,
	IconButton,
	Link,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableSortLabel,
	TableRow,
	Typography,
} from '@mui/material';
import { Trash as TrashIcon } from '../../icons/trash';
import { ArrowRight as ArrowRightIcon } from '../../icons/arrow-right';
import { Scrollbar } from '../scrollbar';
import moment from 'moment';

const applySort = (bukken, sortDir) =>
	bukken.sort((a, b) => {
		let newOrder = 0;

		if (a.createdAt < b.createdAt) {
			newOrder = -1;
		}

		if (a.createdAt > b.createdAt) {
			newOrder = 1;
		}

		return sortDir === 'asc' ? newOrder : -newOrder;
	});

export const BukkenHistoryListTable = (props) => {
	const {
		bukken,
		bukkenHistory,
		bukkenHistoryCount,
		onPageChange,
		onRowsPerPageChange,
		page,
		rowsPerPage,
		deleteHistory,
		...other
	} = props;
	const [sort, setSort] = useState('desc');

	const handleSort = () => {
		setSort((prevOrder) => {
			if (prevOrder === 'asc') {
				return 'desc';
			}

			return 'asc';
		});
	};

	const sortedBukkenHistory = applySort(bukkenHistory, sort);

	return (
		<div {...other}>
			<Scrollbar>
				<Table sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow>
							<TableCell align="right">参照</TableCell>
							<TableCell>概要</TableCell>
							<TableCell sortDirection={sort}>
								<TableSortLabel active direction={sort} onClick={handleSort}>
									履歴
								</TableSortLabel>
							</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sortedBukkenHistory.map((buk) => {
							return (
								<TableRow hover key={buk.id}>
									<TableCell align="right">
										<NextLink href={`/bukken/${bukken?.bukken_no}`} passHref>
											<IconButton component="a">
												<ArrowRightIcon fontSize="small" />
											</IconButton>
										</NextLink>
									</TableCell>
									<TableCell>
										<NextLink href={`/bukken/${bukken?.bukken_no}`} passHref>
											<Link color="inherit" variant="subtitle2">
												<Box
													sx={{
														alignItems: 'center',
														display: 'flex',
													}}
												>
													<Box
														sx={{
															cursor: 'pointer',
															mr: 2,
														}}
													>
														<Typography variant="subtitle2">
															{buk.overview}
														</Typography>
													</Box>
												</Box>
											</Link>
										</NextLink>
									</TableCell>
									<TableCell>
										<Typography color="success.main" variant="subtitle2">
											{moment(buk.createdAt).format("YYYY/MM/DD HH:mm")}
										</Typography>
									</TableCell>
									<TableCell align="left">
										<IconButton component="a" color="error" onClick={() => deleteHistory(buk)}>
											<TrashIcon fontSize="small" />
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Scrollbar>
			<TablePagination
				component="div"
				count={bukkenHistoryCount}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</div>
	);
};

BukkenHistoryListTable.propTypes = {
	bukken: PropTypes.array.isRequired,
	bukkenCount: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	onRowsPerPageChange: PropTypes.func,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	deleteHistory: PropTypes.func.isRequired,
};
