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

const applySort = (items, sortDir, cateSort) =>
    items.sort((a, b) => {
        let newOrder = 0;

		if(cateSort == "created"){
			if (a.createdAt < b.createdAt) {
				newOrder = -1;
			}
			if (a.createdAt > b.createdAt) {
				newOrder = 1;
			}
		}
		else if(cateSort == "schedule"){
			if (a.scheduled_delivery_date < b.scheduled_delivery_date) {
				newOrder = -1;
			}
			if(a.scheduled_delivery_date == null){
				return 1
			}
			if(b.scheduled_delivery_date == null){
				return -1
			}
			if (a.scheduled_delivery_date > b.scheduled_delivery_date) {
				newOrder = 1;
			}
		}
		else if(cateSort == "sendStatus"){
			if (a.important_info_flag < b.important_info_flag) {
				newOrder = -1;
			}
			if (a.important_info_flag > b.important_info_flag) {
				newOrder = 1;
			}
		}
		else if(cateSort == "status"){
			if (a.status < b.status) {
				newOrder = -1;
			}
			if (a.status > b.status) {
				newOrder = 1;
			}
		}
		else if(cateSort == "title"){
			if (a.subject < b.subject) {
				newOrder = -1;
			}
			if(a.subject == null){
				return 1
			}
			if(b.subject == null){
				return -1
			}
			if (a.subject > b.subject) {
				newOrder = 1;
			}
		}

        return sortDir === "asc" ? newOrder : -newOrder;
    });

const applyPagination = (items, page, rowsPerPage) =>
    items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

export const CsInformationListTable = (props) => {
    const {items, deleteInformation, ...other} = props;
    const [sort, setSort] = useState("desc");
	const [cateSort, setCateSort] = useState('created')
	const [sortCreate, setSortCreate] = useState("desc")
	const [sortSchedule, setSortSchedule] = useState("desc");
	const [sortSendStatus, setSortSendStatus] = useState("desc");
	const [sortStatus, setSortStatus] = useState("desc");
	const [sortTitle, setSortTitle] = useState("desc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleSort = () => {
		setSortCreate((prevOrder) => {
            if (prevOrder === "asc") {
				setSort('desc')
                return "desc";		
            }
			setSort('asc')
            return "asc";
        });
		setCateSort('created')
    };

	const handleSortSchedule = () => {
		
        setSortSchedule((prevOrder) => {
            if (prevOrder === "asc") {
				setSort('desc')
                return "desc";
            }
			setSort('asc')
            return "asc";
        });
		setCateSort('schedule')
    };

	const handleSortSendStatus = () => {
		
        setSortSendStatus((prevOrder) => {
            if (prevOrder === "asc") {
				setSort('desc')
                return "desc";
            }
			setSort('asc')
            return "asc";
        });
		setCateSort('sendStatus')
    };

	const handleSortStatus = () => {
		
        setSortStatus((prevOrder) => {
            if (prevOrder === "asc") {
				setSort('desc')
                return "desc";
            }
			setSort('asc')
            return "asc";
        });
		setCateSort('status')
    };

	const handleSortTitle = () => {
		
        setSortTitle((prevOrder) => {
            if (prevOrder === "asc") {
				setSort('desc')
                return "desc";
            }
			setSort('asc')
            return "asc";
        });
		setCateSort('title')
    };

    const handleDelete = async (item) => {
        const accept = await confirm(`${item.subject}を削除しますか？`);
        if (!accept) return;
        await deleteInformation(item);
    };

    const sortedItems = applySort(items, sort, cateSort);
    const paginatedItems = applyPagination(sortedItems, page, rowsPerPage);
    console.log("paginatedItems", paginatedItems);

    return (
        <div {...other}>
            <Scrollbar>
                <Table sx={{minWidth: 700}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" />
                            <TableCell sortDirection={sortStatus}>
							<TableSortLabel
                                    active
                                    direction={sortStatus}
                                    onClick={handleSortStatus}
                                >
								ステータス
								</TableSortLabel>
								</TableCell>
                            <TableCell sortDirection={sortSendStatus}>
							<TableSortLabel
                                    active
                                    direction={sortSendStatus}
                                    onClick={handleSortSendStatus}
                                >
								種別
								</TableSortLabel>
								</TableCell>
                            <TableCell sortDirection={sortTitle}>
							<TableSortLabel
                                    active
                                    direction={sortTitle}
                                    onClick={handleSortTitle}
                                >
								お知らせ概要
								</TableSortLabel>
								</TableCell>
                            <TableCell sortDirection={sortSchedule}> <TableSortLabel
                                    active
                                    direction={sortSchedule}
                                    onClick={handleSortSchedule}
                                >送信（予定）日時
								</TableSortLabel>
								</TableCell>
                            <TableCell sortDirection={sortCreate}>
                                <TableSortLabel
                                    active
                                    direction={sortCreate}
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

                                        <TableCell>{item.subject}</TableCell>
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
