import React, {useState} from "react";
import PropTypes from "prop-types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from "@mui/material";
import {Scrollbar} from "../scrollbar";

const applySort = (items, sortDir, cateSort) =>
    items.sort((a, b) => {
        let newOrder = 0;
        if (cateSort == "withdraw") {
            if (a.withdrawal_flag < b.withdrawal_flag) {
                newOrder = -1;
            }
            if (a.withdrawal_flag > b.withdrawal_flag) {
                newOrder = 1;
            }
        }
		else if(cateSort == "mailStatus"){
			if (a.receive_notification_email_flag < b.receive_notification_email_flag) {
                newOrder = -1;
            }
            if (a.receive_notification_email_flag > b.receive_notification_email_flag) {
                newOrder = 1;
            }
		}
		else if(cateSort == "mail"){
			if (a.email < b.email) {
                newOrder = -1;
            }
            if (a.email > b.email) {
                newOrder = 1;
            }
		}
		else if(cateSort == "name"){
			if (a.name < b.name) {
                newOrder = -1;
            }
            if (a.name > b.name) {
                newOrder = 1;
            }
		}
		else if(cateSort == "nameKana"){
			if (a.name_kana < b.name_kana) {
                newOrder = -1;
            }
            if (a.name_kana > b.name_kana) {
                newOrder = 1;
            }
		}

        return sortDir === "asc" ? newOrder : -newOrder;
    });

const applyPagination = (items, page, rowsPerPage) =>
    items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

export const CsDestinationListTable = (props) => {
    const {items, ...other} = props;
    const [sort, setSort] = useState("desc");
    const [cateSort, setCateSort] = useState("withdraw");
    const [sortWithdraw, setSortWithdraw] = useState("desc");
    const [sortMailStatus, setSortMailStatus] = useState("desc");
	const [sortMail, setSortMail] = useState("desc");
	const [sortName, setSortName] = useState("desc");
	const [sortNameKana, setSortNameKana] = useState("desc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleSortWithdraw = () => {
        setSortWithdraw((prevOrder) => {
            if (prevOrder === "asc") {
                setSort("desc");
                return "desc";
            }
            setSort("asc");
            return "asc";
        });
        setCateSort("withdraw");
    };

    const handleSortMailStatus = () => {
        setSortMailStatus((prevOrder) => {
            if (prevOrder === "asc") {
                setSort("desc");
                return "desc";
            }
            setSort("asc");
            return "asc";
        });
        setCateSort("mailStatus");
    };

	const handleSortMail = () => {
        setSortMail((prevOrder) => {
            if (prevOrder === "asc") {
                setSort("desc");
                return "desc";
            }
            setSort("asc");
            return "asc";
        });
        setCateSort("mail");
    };

	const handleSortName = () => {
        setSortName((prevOrder) => {
            if (prevOrder === "asc") {
                setSort("desc");
                return "desc";
            }
            setSort("asc");
            return "asc";
        });
        setCateSort("name");
    };

	const handleSortNameKana = () => {
        setSortNameKana((prevOrder) => {
            if (prevOrder === "asc") {
                setSort("desc");
                return "desc";
            }
            setSort("asc");
            return "asc";
        });
        setCateSort("nameKana");
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
                            <TableCell sortDirection={sortWithdraw}>
                                <TableSortLabel
                                    active
                                    direction={sortWithdraw}
                                    onClick={handleSortWithdraw}
                                >
                                    ユーザステータス
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sortDirection={sortMailStatus}>
                                <TableSortLabel
                                    active
                                    direction={sortMailStatus}
                                    onClick={handleSortMailStatus}
                                >
                                    メール配信停止
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sortDirection={sortMail}>
							<TableSortLabel
                                    active
                                    direction={sortMail}
                                    onClick={handleSortMail}
                                >
								メールアドレス
								</TableSortLabel>
								</TableCell>
                            <TableCell sortDirection={sortName}>
							<TableSortLabel
                                    active
                                    direction={sortName}
                                    onClick={handleSortName}
                                >
								氏名
								</TableSortLabel>
								</TableCell>
                            <TableCell sortDirection={sortNameKana}>
							<TableSortLabel
                                    active
                                    direction={sortNameKana}
                                    onClick={handleSortNameKana}
                                >
								氏名（カナ）
								</TableSortLabel>
								</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedItems &&
                            paginatedItems.map((item) => {
                                return (
                                    <TableRow hover key={item.id}>
                                        <TableCell>
                                            {item.withdrawal_flag
                                                ? "退会済"
                                                : ""}
                                        </TableCell>
                                        <TableCell>
                                            {item.receive_notification_email_flag
                                                ? ""
                                                : "停止"}
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
