import React, { useState } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {
	Box,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableSortLabel,
	TableRow,
	Typography,
} from '@mui/material';
import { PencilAlt as PencilAltIcon } from '../../icons/pencil-alt';
import { Trash as TrashIcon } from '../../icons/trash';
import { Image as ImageIcon } from '../../icons/image';
import { Scrollbar } from '../scrollbar';

const applySort = (furniture, sortDir) =>
	furniture.sort((a, b) => {
		let newOrder = 0;

		if (a.registeredAt < b.registeredAt) {
			newOrder = -1;
		}

		if (a.registeredAt > b.registeredAt) {
			newOrder = 1;
		}

		return sortDir === 'asc' ? newOrder : -newOrder;
	});

export const FurnitureListTable = (props) => {
	const {
		furniture,
		furnitureCount,
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

	const sortedBukken = applySort(furniture, sort);

	return (
		<div {...other}>
			<Scrollbar>
				<Table sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow>
							<TableCell align="right">参照/編集</TableCell>
							<TableCell>種別</TableCell>
							<TableCell>名称</TableCell>
							<TableCell sortDirection={sort}>
								<TableSortLabel active direction={sort} onClick={handleSort}>
									登録日
								</TableSortLabel>
							</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{sortedBukken.map((buk) => {
							return (
								<TableRow hover key={buk.id}>
									<TableCell align="right">
										<NextLink href="/furniture/normal/1" passHref>
											<Box
												sx={{
													alignItems: 'center',
													display: 'flex',
													justifyContent: 'end',
												}}
											>
												<Box
													sx={{
														mr: 2,
													}}
												>
													<IconButton component="a">
														<PencilAltIcon fontSize="small" />
													</IconButton>
												</Box>
												{buk.image ? (
													<Box
														sx={{
															alignItems: 'center',
															backgroundColor: 'background.default',
															backgroundImage: `url(${buk.image})`,
															backgroundPosition: 'center',
															backgroundSize: 'cover',
															borderRadius: 1,
															display: 'flex',
															height: 80,
															justifyContent: 'center',
															overflow: 'hidden',
															width: 80,
														}}
													/>
												) : (
													<Box
														sx={{
															alignItems: 'center',
															backgroundColor: 'background.default',
															borderRadius: 1,
															display: 'flex',
															height: 80,
															justifyContent: 'center',
															width: 80,
														}}
													>
														<ImageIcon fontSize="small" />
													</Box>
												)}
											</Box>
										</NextLink>
									</TableCell>
									<TableCell>{buk.type}</TableCell>
									<TableCell>{buk.name}</TableCell>
									<TableCell>
										<Typography color="success.main" variant="subtitle2">
											{buk.registeredAt}
										</Typography>
									</TableCell>
									<TableCell align="left">
										<IconButton component="a">
											<TrashIcon fontSize="small" color="error" />
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
				count={furnitureCount}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</div>
	);
};

FurnitureListTable.propTypes = {
	furniture: PropTypes.array.isRequired,
	furnitureCount: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	onRowsPerPageChange: PropTypes.func,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};
