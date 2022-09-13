import React, {useState} from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableSortLabel,
    TableRow,
    Box,
} from "@mui/material";
import {ArrowRight as ArrowRightIcon} from "../../icons/arrow-right";
import {Scrollbar} from "../scrollbar";
import moment from "moment";
import {SeverityPill} from "../severity-pill";
import {Trash as TrashIcon} from "../../icons/trash";
import {confirm} from "components/dialog/confirm-dialog";

const applySort = (items, sortDir) =>
    items.sort((a, b) => {
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

export const CsInformationListTable = (props) => {
    const {items, deleteInformation, ...other} = props;
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

    const handleDelete = async (item) => {
        const accept = await confirm(`${item.subject}を削除しますか？`);
        if (!accept) return;
        await deleteInformation(item);
    };

    const sortedItems = applySort(items, sort);
    const paginatedItems = applyPagination(sortedItems, page, rowsPerPage);
    console.log("paginatedItems", paginatedItems);

    return (
        <div {...other}>
            <Scrollbar>
                <Table sx={{minWidth: 700}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" />
                            <TableCell>ステータス</TableCell>
                            <TableCell>種別</TableCell>
                            <TableCell>お知らせ概要</TableCell>
                            <TableCell>送信（予定）日時</TableCell>
                            <TableCell sortDirection={sort}>
                                <TableSortLabel
                                    active
                                    direction={sort}
                                    onClick={handleSort}
                                >
                                    登録日時
                                </TableSortLabel>
                            </TableCell>
                            <TableCell alignt="left">削除</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedItems &&
                            paginatedItems.map((item) => {
                                return (
                                    <TableRow hover key={item.id}>
                                        <TableCell align="right">
                                            <NextLink
                                                href={`/cs/information/${item.id}`}
                                                passHref
                                            >
                                                <IconButton component="a">
                                                    <ArrowRightIcon fontSize="small" />
                                                </IconButton>
                                            </NextLink>
                                        </TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <SeverityPill
                                                    color={
                                                        (item.important_info_flag ===
                                                            0 &&
                                                            "info") ||
                                                        (item.important_info_flag ===
                                                            1 &&
                                                            "error") ||
                                                        "warning"
                                                    }
                                                >
                                                    {item.important_info_flag ===
                                                    1
                                                        ? "重要なお知らせ"
                                                        : "お知らせ"}
                                                </SeverityPill>
                                            </Box>
                                        </TableCell>

                                        <TableCell>{item.content}</TableCell>
                                        <TableCell>
                                            {item.scheduled_delivery_date &&
                                                moment(
                                                    item.scheduled_delivery_date
                                                ).format("YYYY/MM/DD HH:mm")}
                                        </TableCell>
                                        <TableCell>
                                            {moment(item.createdAt).format(
                                                "YYYY/MM/DD HH:mm"
                                            )}
                                        </TableCell>
                                        <TableCell align="left">
                                            {/* <NextLink href="/bukken/1" passHref> */}
											{
												item.status == "送信済" ? <></> :
												<IconButton
                                                onClick={() => {
                                                    handleDelete(item);
                                                }}
                                                component="a"
                                                color="error"
                                            >
                                                <TrashIcon fontSize="small" />
                                            </IconButton>
											}
                                           
                                            {/* </NextLink> */}
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
                labelRowsPerPage="表示数"
            />
        </div>
    );
};

CsInformationListTable.propTypes = {
    items: PropTypes.array.isRequired,
};
