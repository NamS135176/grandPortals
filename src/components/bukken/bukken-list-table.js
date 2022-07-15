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
import { ArrowRight as ArrowRightIcon } from '../../icons/arrow-right';
import { Image as ImageIcon } from '../../icons/image';
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

export const BukkenListTable = (props) => {
	const {
		bukken,
		bukkenCount,
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

	const sortedBukken = applySort(bukken, sort);

	return (
		<div {...other}>
			<Scrollbar>
				<Table sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow>
							<TableCell align="right">参照</TableCell>
							<TableCell>物件番号</TableCell>
							<TableCell>物件種別</TableCell>
							<TableCell>間取り</TableCell>
							<TableCell sortDirection={sort}>
								<TableSortLabel active direction={sort} onClick={handleSort}>
									登録日
								</TableSortLabel>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sortedBukken.map((buk) => {
							return (
								<TableRow hover key={buk.id}>
									<TableCell align="right">
										<NextLink href="/bukken/1" passHref>
											<IconButton component="a">
												<ArrowRightIcon fontSize="small" />
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
															{buk.id}
														</Typography>
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
											</Link>
										</NextLink>
									</TableCell>
									<TableCell>{buk.type}</TableCell>
									<TableCell>{buk.plan}</TableCell>
									<TableCell>
										<Typography color="success.main" variant="subtitle2">
											{buk.registeredAt}
										</Typography>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Scrollbar>
			<TablePagination
				component="div"
				count={bukkenCount}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</div>
	);
};

BukkenListTable.propTypes = {
	bukken: PropTypes.array.isRequired,
	bukkenCount: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	onRowsPerPageChange: PropTypes.func,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};
