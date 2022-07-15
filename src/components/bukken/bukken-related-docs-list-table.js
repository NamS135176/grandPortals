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
import { Download as DownloadIcon } from '../../icons/download';
import { Trash as TrashIcon } from '../../icons/trash';
import { Scrollbar } from '../scrollbar';

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

export const BukkenRelatedDocsListTable = (props) => {
	const {
		bukkenDocs,
		bukkenDocsCount,
		onPageChange,
		onRowsPerPageChange,
		page,
		rowsPerPage,
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

	const sortedBukkenDocs = applySort(bukkenDocs, sort);

	return (
		<div {...other}>
			<Scrollbar>
				<Table sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow>
							<TableCell align="right">ダウンロード</TableCell>
							<TableCell>資料名</TableCell>
							<TableCell>概要</TableCell>
							<TableCell sortDirection={sort}>
								<TableSortLabel active direction={sort} onClick={handleSort}>
									登録日
								</TableSortLabel>
							</TableCell>
							<TableCell align="right" />
						</TableRow>
					</TableHead>
					<TableBody>
						{sortedBukkenDocs.map((buk) => {
							return (
								<TableRow hover key={buk.id}>
									<TableCell align="right">
										<NextLink href="/bukken/1" passHref>
											<IconButton component="a">
												<DownloadIcon fontSize="small" />
											</IconButton>
										</NextLink>
									</TableCell>
									<TableCell>
										<NextLink href="/bukken/1" passHref>
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
															{buk.name}
														</Typography>
													</Box>
												</Box>
											</Link>
										</NextLink>
									</TableCell>
									<TableCell>{buk.overview}</TableCell>
									<TableCell>
										<Typography color="success.main" variant="subtitle2">
											{buk.registeredAt}
										</Typography>
									</TableCell>
									<TableCell align="left">
										<NextLink href="/bukken/1" passHref>
											<IconButton component="a" color="error">
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
				count={bukkenDocsCount}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</div>
	);
};

BukkenRelatedDocsListTable.propTypes = {
	bukken: PropTypes.array.isRequired,
	bukkenCount: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	onRowsPerPageChange: PropTypes.func,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};
