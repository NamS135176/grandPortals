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
    InputLabel,
    Select,
    FormControl,
    MenuItem,
	Skeleton,
} from "@mui/material";
import {DashboardLayout} from "../../../../components/dashboard/dashboard-layout";
import {BukkenRelatedDocsListTable} from "../../../../components/bukken/bukken-related-docs-list-table";
import {BukkenHistoryListTable} from "../../../../components/bukken/bukken-history-list-table";
import {gtm} from "../../../../lib/gtm";
import {ManagementList} from "../../../../components/management-menu";
import {ArrowLeft as ArrowLeftIcon} from "../../../../icons/arrow-left";
import {ArrowRight as ArrowRightIcon} from "../../../../icons/arrow-right";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import {HistoryDialog} from "../../../../components/history/history-dialog";
import {useInteriorDetail} from "../../../../hooks/use-interior-detail";
import {useRouter} from "next/router";
import {FileUpload} from "../../../../components/widgets/file-upload";
import {InteriorKind} from "../../../../utils/global-data";
import {AddDocumentDialog} from "../../../../components/bukken/add-document-dialog";

const applyPagination = (bukken, page, rowsPerPage) =>
    bukken.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const InteriorDetails = () => {
    const router = useRouter();
    const {interiorId} = router.query;
    const {
        loading,
        interior,
        coverImageUrl,
        histories: bukkenHistory,
        documents: bukkenDocs,
        uploadCoverImage,
        uploadInteriorCover,
        deleteHistory,
        deleteDocument,
        updateInteriorFieldList,
        reloadHistory,
        reloadDocument,
    } = useInteriorDetail(interiorId);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowsPerPageHistory, setRowsPerPageHistory] = useState(5);

    const [form, setForm] = useState({
        kind: "",
        name: null,
        location: null,
        maker: null,
        number: null,
        height: null,
        width: null,
        depth: null,
        date: null,
        quantity: null,
        remarks: null,
    });

    useEffect(() => {
        gtm.push({event: "page_view"});
    }, []);

    useEffect(() => {
        if (!interior?.field_list) return;
        console.log("interior... ", {interior});
        const {
            kind,
            name,
            location,
            maker,
            number,
            height,
            width,
            depth,
            date,
            quantity,
            remarks,
        } = interior.field_list;
        setForm({
            kind,
            name,
            location,
            maker,
            number,
            height,
            width,
            depth,
            date,
            quantity,
            remarks,
        });
    }, [interior]);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //update other object for update field_list
        const fieldList = interior?.field_list ?? {};
        fieldList["kind"] = form.kind;
        fieldList["name"] = form.name;
        fieldList["location"] = form.location;
        fieldList["maker"] = form.maker;
        fieldList["number"] = form.number;
        fieldList["height"] = form.height;
        fieldList["width"] = form.width;
        fieldList["depth"] = form.depth;
        fieldList["date"] = form.date;
        fieldList["quantity"] = form.quantity;
        fieldList["remarks"] = form.remarks;

        updateInteriorFieldList(fieldList);
    };

    // dialog
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
    // end dialog

    const handleDateChange = (date) => {
        setForm({...form, purchaseDate: date});
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
                <title>grandsポータルサイト｜建具・インテリア情報</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: {xs: 4, md: 8},
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
                            <Box
                                sx={{
                                    mb: 4,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Typography variant="subtitle2">
                                    物件番号：HONR000001
                                </Typography>
                            </Box>
                            <Box sx={{mb: 4}}>
                                <Grid
                                    container
                                    justifyContent="space-between"
                                    spacing={3}
                                >
                                    <Grid item>
                                        <Typography variant="h6" mb={3}>
                                            建具・インテリア（既製品）
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            component="label"
                                        >
                                            画像追加
                                            <FileUpload
                                                accept={"image/*"}
                                                onChange={uploadInteriorCover}
                                                prefix="image"
                                            >
                                                <></>
                                            </FileUpload>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            {uploadCoverImage ? (
                                <Skeleton
                                    animation="wave"
                                    variant="rectangular"
                                    width={"100%"}
                                    height={450}
                                    sx={{marginTop: "24px"}}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        backgroundImage: `url(${coverImageUrl})`,
                                        backgroundColor: "#D0D0D0",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                        borderRadius: 1,
                                        height: 450,
                                        mt: 3,
                                    }}
                                />
                            )}
                            <Grid container spacing={3} mt={3}>
                                <Grid item md={8} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="select-lable-kind">
                                            種別
                                        </InputLabel>
                                        <Select
                                            labelId="select-kind"
                                            id="select-kind"
                                            name="kind"
                                            value={form.kind}
                                            label="種別"
                                            onChange={handleChange}
                                        >
                                            {InteriorKind.map((item, idx) => (
                                                <MenuItem
                                                    value={item}
                                                    key={item}
                                                >
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="品名"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="設置場所"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="メーカー"
                                        name="maker"
                                        value={form.maker}
                                        onChange={handleChange}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="型番"
                                        name="number"
                                        value={form.number}
                                        onChange={handleChange}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <TextField
                                            type="number"
                                            label="高さ"
                                            name="height"
                                            value={form.height}
                                            onChange={handleChange}
                                            InputLabelProps={{shrink: true}}
                                        />
                                        <TextField
                                            type="number"
                                            label="幅"
                                            name="width"
                                            value={form.width}
                                            onChange={handleChange}
                                            InputLabelProps={{shrink: true}}
                                        />
                                        <TextField
                                            type="number"
                                            label="奥行"
                                            name="depth"
                                            value={form.depth}
                                            onChange={handleChange}
                                            InputLabelProps={{shrink: true}}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <MobileDatePicker
                                        label="購入日"
                                        inputFormat="MM/dd/yyyy"
                                        value={form.purchaseDate}
                                        onChange={handleDateChange}
                                        renderInput={(inputProps) => (
                                            <TextField {...inputProps} />
                                        )}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        type="number"
                                        label="個数"
                                        name="quantity"
                                        value={form.quantity}
                                        onChange={handleChange}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={4}
                                        label="備考"
                                        name="remarks"
                                        value={form.remarks}
                                        onChange={handleChange}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>

                                <Box
                                    sx={{
                                        justifyContent: "flex-end",
                                        width: "100%",
                                        display: "flex",
                                        mt: 2,
                                    }}
                                >
                                    <Button
                                        endIcon={
                                            <ArrowLeftIcon fontSize="small" />
                                        }
                                        onClick={() =>
                                            router.push("/interior/list")
                                        }
                                        sx={{m: 1}}
                                        variant="outlined"
                                    >
                                        戻る
                                    </Button>
                                    <Button
                                        sx={{m: 1}}
                                        variant="contained"
                                        disabled={loading}
                                        onClick={handleSubmit}
                                    >
                                        登録
                                    </Button>
                                </Box>
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
                                    disabled={!interior?.bukken}
                                >
                                    資料追加
                                </Button>
                                <AddDocumentDialog
                                    onClose={handleCloseDocumentDialog}
                                    open={openDocumentDialog}
                                    mode="edit"
                                    bukken={interior?.bukken}
                                    loadData={() => reloadDocument(interior)}
                                    otherObjectId={interior?.id}
                                />
                            </Box>
                            <BukkenRelatedDocsListTable
                                bukken={interior?.bukken}
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
                                    disabled={!interior?.bukken}
                                >
                                    履歴追加
                                </Button>
                                <HistoryDialog
                                    onClose={handleCloseHistoryDialog}
                                    open={openHistoryDialog}
                                    mode="edit"
                                    bukken={interior?.bukken}
                                    loadData={() => reloadHistory(interior)}
                                    otherObjectId={interior?.id}
                                />
                            </Box>
                            <BukkenHistoryListTable
                                bukken={interior?.bukken}
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
                </Container>
            </Box>
        </>
    );
};
InteriorDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default InteriorDetails;
