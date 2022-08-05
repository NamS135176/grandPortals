import React, {useState} from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
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
} from "@mui/material";
import {ArrowRight as ArrowRightIcon} from "../../icons/arrow-right";
import {Scrollbar} from "../scrollbar";
import {getBukkenType} from "../../utils/bukken";
import moment from "moment";
import {Image as ImageIcon} from "../../icons/image";

const applySort = (bukken, sortDir) =>
    bukken.sort((a, b) => {
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

export const BukkenListTable = (props) => {
    const {items, ...other} = props;
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

    const paginated = applyPagination(sortedBukken, page, rowsPerPage);

    return (
        <div {...other}>
            <Scrollbar>
                <Table sx={{minWidth: 700}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">参照</TableCell>
                            <TableCell>物件番号</TableCell>
                            <TableCell>物件種別</TableCell>
                            <TableCell>間取り</TableCell>
                            <TableCell sortDirection={sort}>
                                <TableSortLabel
                                    active
                                    direction={sort}
                                    onClick={handleSort}
                                >
                                    登録日
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginated.map((buk) => {
                            return (
                                <TableRow hover key={buk.bukken_no}>
                                    <TableCell align="right">
                                        <NextLink
                                            href={`/bukken/${buk.bukken_no}`}
                                            passHref
                                        >
                                            <IconButton component="a">
                                                <ArrowRightIcon fontSize="small" />
                                            </IconButton>
                                        </NextLink>
                                    </TableCell>
                                    <TableCell>
                                        <NextLink
                                            href={`/bukken/${buk.bukken_no}`}
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
                                                            {buk.bukken_no}
                                                        </Typography>
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
                                                                overflow:
                                                                    "hidden",
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
                                            </Link>
                                        </NextLink>
                                    </TableCell>
                                    <TableCell>{getBukkenType(buk)}</TableCell>
                                    <TableCell>{buk.floor_plan}</TableCell>
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

BukkenListTable.propTypes = {
    items: PropTypes.array.isRequired,
};
