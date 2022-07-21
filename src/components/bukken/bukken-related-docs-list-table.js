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
import moment from 'moment';
import { getDocumentUrlPath } from '../../utils/bukken';

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
		bukken,
		bukkenDocs,
		bukkenDocsCount,
		onPageChange,
		onRowsPerPageChange,
		page,
		rowsPerPage,
		deleteDocument,
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
                                        <NextLink
                                            href={getDocumentUrlPath(buk)}
                                            passHref
                                        >
											<a href={getDocumentUrlPath(buk)} target={"_blank"}>
												<IconButton component="a">
													<DownloadIcon fontSize="small" />
												</IconButton>
											</a>
                                        </NextLink>
                                    </TableCell>
                                    <TableCell>
                                        <NextLink
                                            href={`/bukken/${bukken.bukken_no}`}
                                            passHref
                                        >
                                            <Link
                                                color="inherit"
                                                variant="subtitle2"
                                            >
                                                <Box
                                                    sx={{
                                                        alignItems: "center",
                                                        display: "flex",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            cursor: "pointer",
                                                            mr: 2,
                                                        }}
                                                    >
                                                        <Typography variant="subtitle2">
                                                            {
                                                                buk.orignal_file_name
                                                            }
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Link>
                                        </NextLink>
                                    </TableCell>
                                    <TableCell>{buk.overview}</TableCell>
                                    <TableCell>
                                        <Typography
                                            color="success.main"
                                            variant="subtitle2"
                                        >
                                            {moment(buk.createdAt).format(
                                                "YYYY/MM/DD HH:mm"
                                            )}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton component="a" color="error" onClick={() => deleteDocument(buk)}>
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
	deleteDocument: PropTypes.func.isRequired,
};
