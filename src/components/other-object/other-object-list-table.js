import React, {useCallback, useState} from 'react';
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
import {PencilAlt as PencilAltIcon} from '../../icons/pencil-alt';
import {Trash as TrashIcon} from '../../icons/trash';
import {Image as ImageIcon} from '../../icons/image';
import {Scrollbar} from '../scrollbar';
import {OtherObjectFieldKind, OtherObjectKind} from '../../utils/bukken';
import moment from 'moment';
import {confirm} from '../dialog/confirm-dialog';

const applySort = (items, sortDir) =>
	items.sort((a, b) => {
		let newOrder = 0;

		if (a.createdAt < b.createdAt) {
			newOrder = -1;
		}

		if (a.createdAt > b.createdAt) {
			newOrder = 1;
		}

		return sortDir === 'asc' ? newOrder : -newOrder;
	});

const applyPagination = (items, page, rowsPerPage) =>
	items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

export const OtherObjectListTable = (props) => {
	const {items, deleteObject, ...other} = props;
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

	const sortedBukken = applySort(items, sort);

	const paginatedOtherObject = applyPagination(
		sortedBukken,
		page,
		rowsPerPage
	);

	const getRoute = useCallback((items) => {
		switch (items.object_kind) {
			case OtherObjectKind.Interior:
				return '/interior';
			case OtherObjectKind.Furniture:
				return '/furniture';
			case OtherObjectKind.HomeAppliances:
				return '/appliances';
			case OtherObjectKind.Facilities:
				return '/facility';
			case OtherObjectKind.Other:
				return '/other';
			default:
				return '';
		}
	}, []);

	const handleDelete = async (item) => {
		const accept = await confirm(
			'削除する場合、関連する資料や画像、履歴も削除されますがよろしいですか？'
		);
		if (accept) {
			deleteObject(item);
		}
	};

	return (
		<div {...other}>
			<Scrollbar>
				<Table sx={{minWidth: 700}}>
					<TableHead>
						<TableRow>
							<TableCell>参照/編集</TableCell>
							<TableCell>種別</TableCell>
							<TableCell>名称</TableCell>
							<TableCell sortDirection={sort}>
								<TableSortLabel
									active
									direction={sort}
									onClick={handleSort}
								>
									登録日
								</TableSortLabel>
							</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedOtherObject.map((buk) => {
							const link = `/${getRoute(buk)}/${
								buk.field_kind ==
								OtherObjectFieldKind.ReadyMadeProduct
									? 'normal'
									: 'order'
							}/${buk.id}`;
							return (
								<TableRow hover key={buk.id}>
									<TableCell align="right">
										<NextLink href={link} passHref>
											<Box
												sx={{
													alignItems: 'center',
													display: 'flex',
													justifyContent: {
														xs: 'end',
														md: 'space-between',
													},
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
															alignItems:
																'center',
															backgroundColor:
																'background.default',
															backgroundImage: `url(${buk.image})`,
															backgroundPosition:
																'center',
															backgroundSize:
																'cover',
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
															alignItems:
																'center',
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
											</Box>
										</NextLink>
									</TableCell>
									<TableCell>
										{buk.field_list?.kind}
									</TableCell>
									<TableCell>
										{buk.field_list?.name}
									</TableCell>
									<TableCell>
										<Typography
											color="success.main"
											variant="subtitle2"
										>
											{moment(buk.createdAt).format(
												'YYYY/MM/DD HH:mm'
											)}
										</Typography>
									</TableCell>
									<TableCell align="left">
										<IconButton component="a">
											<TrashIcon
												fontSize="small"
												color="error"
												onClick={() =>
													handleDelete(buk)
												}
											/>
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
				count={items?.length}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</div>
	);
};

OtherObjectListTable.propTypes = {
	items: PropTypes.array.isRequired,
	deleteObject: PropTypes.func.isRequired,
};
