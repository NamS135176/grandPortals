import React, {useState} from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
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
} from "@mui/material";
import {PencilAlt as PencilAltIcon} from "../../icons/pencil-alt";
import {Trash as TrashIcon} from "../../icons/trash";
import {Image as ImageIcon} from "../../icons/image";
import {Scrollbar} from "../scrollbar";
import moment from "moment";
import {confirm} from "../dialog/confirm-dialog";

const applySort = (room, sortDir) =>
    room.sort((a, b) => {
        let newOrder = 0;

        if (a.createdAt < b.createdAt) {
            newOrder = -1;
        }

        if (a.createdAt > b.createdAt) {
            newOrder = 1;
        }

        return sortDir === "asc" ? newOrder : -newOrder;
    });

const applyPagination = (items, page, rowsPerPage) =>
    items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

export const RoomListTable = (props) => {
    const {
        items,
        deleteRoom,
        ...other
    } = props;
    const [sort, setSort] = useState("desc");

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
            if (prevOrder === "asc") {
                return "desc";
            }

            return "asc";
        });
    };

    const sortedBukken = applySort(items, sort);

    const paginatedItems = applyPagination(
        sortedBukken,
        page,
        rowsPerPage
    );

    const handleDelete = async (item) => {
        const accept = await confirm(
            "削除する場合、関連する資料や画像、履歴も削除されますがよろしいですか？"
        );
        if (accept) {
            deleteRoom(item);
        }
    };

    return (
        <div {...other}>
            <Scrollbar>
                <Table sx={{minWidth: 700}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">参照/編集</TableCell>
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
                        {paginatedItems.map((buk) => {
                            return (
                                <TableRow hover key={buk.id}>
                                    <TableCell align="right">
                                        <NextLink
                                            href={`/room/${buk.id}`}
                                            passHref
                                        >
                                            <Box
                                                sx={{
                                                    alignItems: "center",
                                                    display: "flex",
                                                    justifyContent: "end",
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
                                                                "center",
                                                            backgroundColor:
                                                                "background.default",
                                                            backgroundImage: `url(${buk.image})`,
                                                            backgroundPosition:
                                                                "center",
                                                            backgroundSize:
                                                                "cover",
                                                            borderRadius: 1,
                                                            display: "flex",
                                                            height: 80,
                                                            justifyContent:
                                                                "center",
                                                            overflow: "hidden",
                                                            width: 80,
                                                        }}
                                                    />
                                                ) : (
                                                    <Box
                                                        sx={{
                                                            alignItems:
                                                                "center",
                                                            backgroundColor:
                                                                "background.default",
                                                            borderRadius: 1,
                                                            display: "flex",
                                                            height: 80,
                                                            justifyContent:
                                                                "center",
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
                                        <IconButton
                                            component="a"
                                            onClick={() => handleDelete(buk)}
                                        >
                                            <TrashIcon
                                                fontSize="small"
                                                color="error"
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

RoomListTable.propTypes = {
    room: PropTypes.array.isRequired,
    roomCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};
