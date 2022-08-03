import React, {useCallback, useState} from "react";
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
import {OtherObjectFieldKind, OtherObjectKind} from "../../utils/bukken";
import moment from "moment";

const applySort = (otherObject, sortDir) =>
    otherObject.sort((a, b) => {
        let newOrder = 0;

        if (a.createdAt < b.createdAt) {
            newOrder = -1;
        }

        if (a.createdAt > b.createdAt) {
            newOrder = 1;
        }

        return sortDir === "asc" ? newOrder : -newOrder;
    });

export const OtherObjectListTable = (props) => {
    const {
        otherObject,
        interiorCount,
        onPageChange,
        onRowsPerPageChange,
        page,
        rowsPerPage,
        ...other
    } = props;
    const [sort, setSort] = useState("desc");

    const handleSort = () => {
        setSort((prevOrder) => {
            if (prevOrder === "asc") {
                return "desc";
            }

            return "asc";
        });
    };

    const sortedBukken = applySort(otherObject, sort);

    const getRoute = useCallback((otherObject) => {
        switch (otherObject.object_kind) {
            case OtherObjectKind.Interior:
                return "/interior";
            case OtherObjectKind.Furniture:
                return "/furniture";
            case OtherObjectKind.HomeAppliances:
                return "/appliances";
            case OtherObjectKind.Facilities:
                return "/facility";
            case OtherObjectKind.Other:
                return "/others";
            default:
                return "";
        }
    }, []);

    return (
        <div {...other}>
            <Scrollbar>
                <Table sx={{minWidth: 700}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">参照/編集</TableCell>
                            <TableCell>名称</TableCell>
                            <TableCell>設置場所</TableCell>
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
                        {sortedBukken.map((buk) => {
                            const link = `/${getRoute(buk)}/${
                                buk.field_kind ==
                                OtherObjectFieldKind.ReadyMadeProduct
                                    ? "normal"
                                    : "order"
                            }/${buk.id}`;
                            return (
                                <TableRow hover key={buk.id}>
                                    <TableCell align="right">
                                        <NextLink href={link} passHref>
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
                                    <TableCell>{buk.name}</TableCell>
                                    <TableCell>{buk.field_list?.location}</TableCell>
                                    <TableCell>
                                        <Typography
                                            color="success.main"
                                            variant="subtitle2"
                                        >
                                            {moment(buk.createdAt).format("YYYY/MM/DD HH:mm")}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton component="a">
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

OtherObjectListTable.propTypes = {
    otherObject: PropTypes.array.isRequired,
    interiorCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};
