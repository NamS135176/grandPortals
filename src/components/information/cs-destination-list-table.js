import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material';
import {Scrollbar} from '../scrollbar';

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

export const CsDestinationListTable = (props) => {
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
							<TableCell>ユーザステータス</TableCell>
							<TableCell>メール配信停止</TableCell>
							<TableCell>メールアドレス</TableCell>
							<TableCell>氏名</TableCell>
							<TableCell>氏名（カナ）</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedItems &&
							paginatedItems.map((item) => {
								return (
									<TableRow hover key={item.id}>
										<TableCell>{item.status}</TableCell>
										<TableCell>
											{item.delivery && 'ON'}
										</TableCell>
										<TableCell>{item.email}</TableCell>
										<TableCell>{item.name}</TableCell>
										<TableCell>{item.name_kana}</TableCell>
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

CsDestinationListTable.propTypes = {
	items: PropTypes.array.isRequired,
};
