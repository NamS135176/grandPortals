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
import { OtherObjectFieldKind } from '../../utils/bukken';
import moment from 'moment';

const applySort = (interior, sortDir) =>
	interior.sort((a, b) => {
		let newOrder = 0;

		if (a.createdAt < b.createdAt) {
			newOrder = -1;
		}

		if (a.createdAt > b.createdAt) {
			newOrder = 1;
		}

		return sortDir === 'asc' ? newOrder : -newOrder;
	});

export const InteriorListTable = (props) => {
	const {
		interior,
		interiorCount,
		onPageChange,
		onRowsPerPageChange,
		page,
		rowsPerPage,
		deleteInterior,
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

	const sortedBukken = applySort(interior, sort);

	return (
		<div {...other}>
			<Scrollbar>
				<Table sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow>
							<TableCell align="right">参照/編集</TableCell>
							<TableCell>名称</TableCell>
							<TableCell>設置場所</TableCell>
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
							const link = `/interior/${buk.field_kind == OtherObjectFieldKind.ReadyMadeProduct ? "normal" : "order"}/${buk.id}`
							console.log("InteriorListTable... ", buk)
							return (
								<TableRow hover key={buk.id}>
									<TableCell align="right">
										<NextLink href={link} passHref>
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
												{buk.field_list.thumnail ? (
													<Box
														sx={{
															alignItems: 'center',
															backgroundColor: 'background.default',
															backgroundImage: `url(${buk.field_list.thumnail})`,
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
									<TableCell>{buk.field_list.name}</TableCell>
									<TableCell>{buk.field_list?.location}</TableCell>
									<TableCell>
										<Typography color="success.main" variant="subtitle2">
											{moment(buk.createdAt).format("YYYY/MM/DD HH:mm")}
										</Typography>
									</TableCell>
									<TableCell align="left">
										<IconButton component="a">
											<TrashIcon fontSize="small" color="error" onClick={() => deleteInterior(buk)}/>
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
				count={interiorCount}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</div>
	);
};

InteriorListTable.propTypes = {
	interior: PropTypes.array.isRequired,
	interiorCount: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	onRowsPerPageChange: PropTypes.func,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	deleteInterior: PropTypes.func.isRequired,
};
