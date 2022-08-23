import React, {useState} from 'react';
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
import {Trash as TrashIcon} from '../../icons/trash';
import {PencilAlt as PencilAltIcon} from '../../icons/pencil-alt';
import {Scrollbar} from '../scrollbar';
import {HistoryDialog} from '../../components/history/history-dialog';

const applySort = (bukken, sortDir) =>
	bukken.sort((a, b) => {
		let newOrder = 0;

		if (a.registeredAt < b.registeredAt) {
			newOrder = -1;
		}

		if (a.registeredAt > b.registeredAt) {
			newOrder = 1;
		}

		return sortDir === 'asc' ? newOrder : -newOrder;
	});

export const HistoryListTable = (props) => {
	const {
		bukkenHistory,
		bukkenHistoryCount,
		onPageChange,
		onRowsPerPageChange,
		page,
		rowsPerPage,
		...other
	} = props;
	const [sort, setSort] = useState('desc');

	// dialog
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => {
		setOpenDialog(true);
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};
	// ./dialog

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
				<Table sx={{minWidth: 700}}>
					<TableHead>
						<TableRow>
							<TableCell align="right">参照</TableCell>
							<TableCell align="left">種別</TableCell>
							<TableCell align="left">名称</TableCell>
							<TableCell sx={{minWidth: 200}}>概要</TableCell>
							<TableCell sortDirection={sort}>
								<TableSortLabel
									active
									direction={sort}
									onClick={handleSort}
								>
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
										<IconButton
											component="a"
											color="primary"
											onClick={handleOpenDialog}
										>
											<PencilAltIcon fontSize="small" />
										</IconButton>
									</TableCell>
									<TableCell>{buk.type}</TableCell>
									<TableCell>{buk.name}</TableCell>
									<TableCell>
										<NextLink href="/bukken/1" passHref>
											<Link
												color="inherit"
												variant="subtitle2"
											>
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
										<Typography
											color="success.main"
											variant="subtitle2"
										>
											{buk.registeredAt}
										</Typography>
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
				count={bukkenHistoryCount}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
				labelRowsPerPage="表示数"
			/>
			<HistoryDialog
				onClose={handleCloseDialog}
				open={openDialog}
				mode="reference"
			/>
		</div>
	);
};

HistoryListTable.propTypes = {
	bukkenHistory: PropTypes.array.isRequired,
	bukkenHistoryCount: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	onRowsPerPageChange: PropTypes.func,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};
