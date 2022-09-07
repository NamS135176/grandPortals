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
	Modal,
	Typography,
	Button
} from "@mui/material";
import {ArrowRight as ArrowRightIcon} from "../../icons/arrow-right";
import {Scrollbar} from "../scrollbar";
import moment from "moment";
import {SeverityPill} from "../severity-pill";
import {Trash as TrashIcon} from "../../icons/trash";
import {Image as ImageIcon} from "../../icons/image";

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
	const [openModal, setOpenModal] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
	const [selectedItem,setSelectedItem] = useState(null)

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

	const handleDelete = async () => {
	   await deleteInformation(selectedItem)
	   setOpenModal(false)
	   setSelectedItem(null)
	}

    const sortedItems = applySort(items, sort);
    const paginatedItems = applyPagination(sortedItems, page, rowsPerPage);
    console.log("paginatedItems", paginatedItems);

    return (
        <div {...other}>
            <Scrollbar>
                <Modal
                    open={openModal}
                    onClose={() => {
						setOpenModal(false)
						setSelectedItem(null)
					}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
						  position: 'absolute',
						  top: '50%',
						  left: '50%',
						  transform: 'translate(-50%, -50%)',
						  width: 400,
						  bgcolor: 'background.paper',
						  border: '2px solid #000',
						  boxShadow: 24,
						  p: 4,
					}}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                           を削除しますか？
                        </Typography>
                        <Button onClick={handleDelete} id="modal-modal-description" sx={{mt: 2}}>
						OK
                        </Button>
						<Button onClick={() => setOpenModal(false)} id="modal-modal-description" sx={{mt: 2}}>
						Cancel
                        </Button>
                    </Box>
                </Modal>
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
                                    登録日
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
                                            <IconButton
											onClick={() => {
												setOpenModal(true)
												setSelectedItem(item)
											}}
                                                component="a"
                                                color="error"
                                            >
                                                <TrashIcon fontSize="small" />
                                            </IconButton>
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
