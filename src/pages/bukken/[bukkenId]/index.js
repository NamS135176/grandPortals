import {useCallback, useEffect, useState} from "react";
import Head from "next/head";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    Container,
    Divider,
    Grid,
    Typography,
    TextField,
} from "@mui/material";
import {bukkenApi} from "../../../__fake-api__/bukken-api";
import {DashboardLayout} from "../../../components/dashboard/dashboard-layout";
import {BukkenRelatedDocsListTable} from "../../../components/bukken/bukken-related-docs-list-table";
import {BukkenHistoryListTable} from "../../../components/bukken/bukken-history-list-table";
import {useMounted} from "../../../hooks/use-mounted";
import {gtm} from "../../../lib/gtm";
import {ManagementList} from "../../../components/management-menu";
import {ArrowRight as ArrowRightIcon} from "../../../icons/arrow-right";
import {HistoryDialog} from "../../../components/history/history-dialog";
import {useRouter} from "next/router";
import {useBukkenDetail} from "../../../hooks/use-bukken-detail";
import {getBukenCoverImage, getBukkenType} from "../../../utils/bukken";
import moment from "moment";
import {AddDocumentDialog} from "../../../components/bukken/add-document-dialog";

const applyPagination = (bukken, page, rowsPerPage) =>
    bukken.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const BukkenDetails = () => {
    const router = useRouter();
    const {bukkenId} = router.query;
    const {
        bukken,
        histories: bukkenHistory,
        documents: bukkenDocs,
        deleteDocument, 
        deleteHistory,
        reloadDocument,
        reloadHistory
    } = useBukkenDetail(bukkenId);
    const [docList, setDoclist] =useState(bukkenDocs)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowsPerPageHistory, setRowsPerPageHistory] = useState(5);
    const [form, setForm] = useState({
        bukken_kind: "自宅",
        floor_plan: "2LDK",
        shinchiku_date: "築10年",
        remarks: "テキストサンプルテキストサンプルテキストサンプル",
    });

    useEffect(() => {
        if (!bukken) return;
        setForm({
            bukken_kind: getBukkenType(bukken),
            floor_plan: bukken.floor_plan,
            shinchiku_date: moment().subtract(375, "days").fromNow(),
            remarks: bukken.remarks,
        });
    }, [bukken]);

    useEffect(() => {
        gtm.push({event: "page_view"});
    }, []);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
    const handleOpenHistoryDialog = () => {
        setOpenHistoryDialog(true);
    };
    const handleCloseHistoryDialog = () => {
        setOpenHistoryDialog(false);
    };

    const [openDocumentDialog, setOpenDocumentDialog] = useState(false);
    const handleOpenDocumentDialog = () => {
        setOpenDocumentDialog(true);
    };
    const handleCloseDocumentDialog = () => {
        setOpenDocumentDialog(false);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handlePageHistoryChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleRowsPerPageHistoryChange = (event) => {
        setRowsPerPageHistory(parseInt(event.target.value, 10));
    };

    // Usually query is done on backend with indexing solutions
    const paginatedBukkenDocs = applyPagination(bukkenDocs, page, rowsPerPage);
    const paginatedBukkenHistory = applyPagination(
        bukkenHistory,
        page,
        rowsPerPage
    );

    return (
        <>
            <Head>
                <title>grandsポータルサイト｜物件情報</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            mb: 4,
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Typography variant="subtitle2">
                            お問い合わせ：0463-79-5564
                        </Typography>
                    </Box>
                    <Card>
                        <CardContent>
                            <ManagementList />
                            <Divider
                                sx={{
                                    mb: 3,
                                    mt: 3,
                                }}
                            />
                            <Grid
                                container
                                justifyContent="space-between"
                                spacing={3}
                            >
                                <Grid item>
                                    <Typography variant="h6" mb={3}>
                                        物件情報
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2">
                                        物件番号：{bukkenId}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Box
                                sx={{
                                    backgroundImage: `url(${getBukenCoverImage(bukken)})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    borderRadius: 1,
                                    height: 450,
                                    mt: 3,
                                }}
                            />
                            <Grid container spacing={3} mt={3}>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="物件種別"
                                        name="type"
                                        required
                                        disabled
                                        value={form.bukken_kind}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="間取り"
                                        name="plan"
                                        required
                                        disabled
                                        value={form.floor_plan}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="築年数"
                                        name="years"
                                        required
                                        disabled
                                        value={form.shinchiku_date}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={4}
                                        label="備考"
                                        name="note"
                                        value={form.remarks}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Divider
                                sx={{
                                    mb: 3,
                                    mt: 3,
                                }}
                            />
                            <Box
                                sx={{
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    my: 3,
                                }}
                            >
                                <Typography variant="h6">
                                    関連資料一覧
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={handleOpenDocumentDialog}
                                >
                                    資料追加
                                </Button>
                                <AddDocumentDialog
                                    onClose={handleCloseDocumentDialog}
                                    open={openDocumentDialog}
                                    mode="edit"
                                    bukken={bukken}
                                    loadData={reloadDocument}
                                />
                            </Box>
                            <BukkenRelatedDocsListTable
                                bukken={bukken}
                                bukkenDocs={paginatedBukkenDocs}
                                bukkenDocsCount={bukkenDocs.length}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                deleteDocument={deleteDocument}
                            />
                            <Divider
                                sx={{
                                    mb: 3,
                                    mt: 3,
                                }}
                            />
                            <Box
                                sx={{
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    my: 3,
                                }}
                            >
                                <Typography variant="h6">最新履歴</Typography>
                                <Button
                                    variant="contained"
                                    onClick={handleOpenHistoryDialog}
                                >
                                    履歴追加
                                </Button>
                                <HistoryDialog
                                    onClose={handleCloseHistoryDialog}
                                    open={openHistoryDialog}
                                    mode="edit"
                                    bukken={bukken}
                                    loadData={reloadHistory}
                                />
                            </Box>
                            <BukkenHistoryListTable
                                bukken={bukken}
                                bukkenHistory={paginatedBukkenHistory}
                                bukkenHistoryCount={bukkenHistory.length}
                                onPageChange={handlePageHistoryChange}
                                onRowsPerPageChange={
                                    handleRowsPerPageHistoryChange
                                }
                                rowsPerPage={rowsPerPageHistory}
                                page={page}
                                deleteHistory={deleteHistory}
                            />
                        </CardContent>
                        <CardActions>
                            <Button
                                href="/history"
                                endIcon={<ArrowRightIcon fontSize="small" />}
                            >
                                全ての履歴を見る
                            </Button>
                        </CardActions>
                    </Card>
                    <Box
                        sx={{
                            mx: -1,
                            mb: -1,
                            mt: 3,
                        }}
                    >
                        <Button sx={{m: 1}} variant="contained">
                            登録
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};
BukkenDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default BukkenDetails;
