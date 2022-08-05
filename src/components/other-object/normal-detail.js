import {useCallback, useEffect, useMemo, useState} from "react";
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
    FormHelperText,
} from "@mui/material";
import {DashboardLayout} from "../dashboard/dashboard-layout";
import {BukkenRelatedDocsListTable} from "../bukken/bukken-related-docs-list-table";
import {BukkenHistoryListTable} from "../bukken/bukken-history-list-table";
import {ManagementList} from "../management-menu";
import {ArrowLeft as ArrowLeftIcon} from "../../icons/arrow-left";
import {ArrowRight as ArrowRightIcon} from "../../icons/arrow-right";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import {HistoryDialog} from "../history/history-dialog";
import {useRouter} from "next/router";
import {FileUpload} from "../widgets/file-upload";
import {AddDocumentDialog} from "../bukken/add-document-dialog";
import {useFormik} from "formik";
import * as Yup from "yup";
import * as R from "ramda";
import PropTypes from "prop-types";
import {OtherObjectKind} from "../../utils/bukken";
import {OtherObjectSelectKind} from "../../utils/global-data";
import {gtm} from "../../lib/gtm";
import {useOtherObjectDetail} from "../../hooks/use-other-object-detail";
import {useBukkenDefault} from "../../hooks/use-bukken-default";

const applyPagination = (bukken, page, rowsPerPage) =>
    bukken.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const OtherObjectNormalDetails = ({id, otherObjectKind}) => {
    const router = useRouter();
    const {
        loading,
        otherObject,
        coverImageUrl,
        histories: bukkenHistory,
        documents: bukkenDocs,
        uploadingCoverImage,
        uploadOtherObjectCover,
        deleteHistory,
        deleteDocument,
        updateOtherObjectFieldList,
        reloadHistory,
        reloadDocument,
    } = useOtherObjectDetail(id, otherObjectKind);
    const {bukken} = useBukkenDefault();

    const [pageDocument, setPageDocument] = useState(0);
    const [rowsPerPageDocument, setRowsPerPageDocument] = useState(5);
    const [pageHistory, setPageHistory] = useState(0);
    const [rowsPerPageHistory, setRowsPerPageHistory] = useState(5);

    const formik = useFormik({
        initialValues: {
            kind: "",
            name: "",
            location: null,
            maker: null,
            number: null,
            height: null,
            width: null,
            depth: null,
            date: null,
            quantity: null,
            remarks: null,
        },
        validationSchema: Yup.object({
            kind: Yup.string().required("種別は必須です。"),
            name: Yup.string().required("名称は必須です。"),
        }),
        onSubmit: async (values, helpers) => {
            // console.log("formik... onSubmit", { values, helpers });
            const errors = await helpers.validateForm();
            console.log("formik... onSubmit", {
                values,
                helpers,
                errors,
                errorsEmpty: R.isEmpty(errors),
            });
            if (R.isEmpty(errors)) {
                handleSubmit(values);
            }
        },
    });

    useEffect(() => {
        gtm.push({event: "page_view"});
    }, []);

    useEffect(() => {
        if (!otherObject?.field_list) return;
        console.log("otherObject... ", {otherObject});
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
        } = otherObject.field_list;
        formik.setValues({
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
    }, [otherObject]);

    const handleSubmit = (values) => {
        console.log("handleSubmit... ", {values});
        //update other object for update field_list
        const fieldList = otherObject?.field_list ?? {};
        fieldList["kind"] = values.kind;
        fieldList["name"] = values.name;
        fieldList["location"] = values.location;
        fieldList["maker"] = values.maker;
        fieldList["number"] = values.number;
        fieldList["height"] = values.height;
        fieldList["width"] = values.width;
        fieldList["depth"] = values.depth;
        fieldList["date"] = values.date;
        fieldList["quantity"] = values.quantity;
        fieldList["remarks"] = values.remarks;

        console.log("handleSubmit... ", {fieldList});
        updateOtherObjectFieldList(fieldList);
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
        formik.setFieldValue("date", date);
    };

    const handlePageChange = (event, newPage) => {
        setPageDocument(newPage);
    };

    const handlePageHistoryChange = (event, newPage) => {
        setPageHistory(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPageDocument(parseInt(event.target.value, 10));
        setPageDocument(0);
    };

    const handleRowsPerPageHistoryChange = (event) => {
        setRowsPerPageHistory(parseInt(event.target.value, 10));
        setPageHistory(0);
    };

    // Usually query is done on backend with indexing solutions
    const paginatedBukkenDocs = applyPagination(
        bukkenDocs,
        pageDocument,
        rowsPerPageDocument
    );
    const paginatedBukkenHistory = applyPagination(
        bukkenHistory,
        pageHistory,
        rowsPerPageHistory
    );

    const kindCaption = useMemo(() => {
        switch (otherObjectKind) {
            case OtherObjectKind.Interior:
                return "建具";
            case OtherObjectKind.Furniture:
                return "家具一覧";
            case OtherObjectKind.HomeAppliances:
                return "家電一覧";
            case OtherObjectKind.Facilities:
                return "設備一覧";
            case OtherObjectKind.Other:
                return "その他一覧";
            default:
                return "";
        }
    }, [otherObjectKind]);

    const backUrl = useMemo(() => {
        switch (otherObjectKind) {
            case OtherObjectKind.Interior:
                return "/interior/list";
            case OtherObjectKind.Furniture:
                return "/furniture/list";
            case OtherObjectKind.HomeAppliances:
                return "/appliances/list";
            case OtherObjectKind.Facilities:
                return "/facility/list";
            case OtherObjectKind.Other:
                return "/other/list";
            default:
                return "";
        }
    }, [otherObjectKind]);

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
                        </CardContent>
                    </Card>
                    <Card sx={{mt: 4}}>
                        <CardContent>
                            <Box
                                sx={{
                                    mb: 4,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Typography variant="subtitle2">
                                    {bukken
                                        ? `物件番号：${bukken.bukken_no}`
                                        : ""}
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
                                            {kindCaption}・インテリア（既製品）
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
                                                onChange={
                                                    uploadOtherObjectCover
                                                }
                                                prefix="image"
                                            >
                                                <></>
                                            </FileUpload>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            {uploadingCoverImage ? (
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
                                    <FormControl
                                        fullWidth
                                        error={Boolean(
                                            formik.touched.kind &&
                                                formik.errors.kind
                                        )}
                                    >
                                        <InputLabel
                                            id="select-lable-kind"
                                            required
                                        >
                                            種別
                                        </InputLabel>
                                        <Select
                                            labelId="select-kind"
                                            id="select-kind"
                                            name="kind"
                                            label="種別"
                                            required
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.kind}
                                        >
                                            {OtherObjectSelectKind.map(
                                                (item, idx) => (
                                                    <MenuItem
                                                        value={item}
                                                        key={item}
                                                    >
                                                        {item}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        <FormHelperText>
                                            {formik.touched.kind &&
                                                formik.errors.kind}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="品名"
                                        name="name"
                                        InputLabelProps={{shrink: true}}
                                        error={Boolean(
                                            formik.touched.name &&
                                                formik.errors.name
                                        )}
                                        helperText={
                                            formik.touched.name &&
                                            formik.errors.name
                                        }
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        required
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="設置場所"
                                        name="location"
                                        onChange={formik.handleChange}
                                        value={formik.values.location}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="メーカー"
                                        name="maker"
                                        onChange={formik.handleChange}
                                        value={formik.values.maker}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="型番"
                                        name="number"
                                        onChange={formik.handleChange}
                                        value={formik.values.number}
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
                                            label="高さ(cm)"
                                            name="height"
                                            onChange={formik.handleChange}
                                            value={formik.values.height}
                                            InputLabelProps={{shrink: true}}
                                        />
                                        <TextField
                                            type="number"
                                            label="幅(cm)"
                                            name="width"
                                            onChange={formik.handleChange}
                                            value={formik.values.width}
                                            InputLabelProps={{shrink: true}}
                                        />
                                        <TextField
                                            type="number"
                                            label="奥行(cm)"
                                            name="depth"
                                            onChange={formik.handleChange}
                                            value={formik.values.depth}
                                            InputLabelProps={{shrink: true}}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <MobileDatePicker
                                        label="購入日"
                                        inputFormat="MM/dd/yyyy"
                                        value={formik.values.date}
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
                                        onChange={formik.handleChange}
                                        value={formik.values.quantity}
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
                                        onChange={formik.handleChange}
                                        value={formik.values.remarks}
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
                                            router.push(backUrl)
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
                                        onClick={formik.handleSubmit}
                                    >
                                        登録
                                    </Button>
                                </Box>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card sx={{mt: 4}}>
                        <CardContent>
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
                                    disabled={!otherObject?.bukken}
                                >
                                    資料追加
                                </Button>
                                <AddDocumentDialog
                                    onClose={handleCloseDocumentDialog}
                                    open={openDocumentDialog}
                                    mode="edit"
                                    bukken={otherObject?.bukken}
                                    loadData={() => reloadDocument(otherObject)}
                                    otherObjectId={otherObject?.id}
                                    objectKind={otherObject.object_kind}
                                />
                            </Box>
                            <BukkenRelatedDocsListTable
                                bukken={otherObject?.bukken}
                                bukkenDocs={paginatedBukkenDocs}
                                bukkenDocsCount={bukkenDocs.length}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                rowsPerPage={rowsPerPageDocument}
                                page={pageDocument}
                                deleteDocument={deleteDocument}
                            />
                        </CardContent>
                    </Card>
                    <Card sx={{mt: 4}}>
                        <CardContent>
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
                                    disabled={!otherObject?.bukken}
                                >
                                    履歴追加
                                </Button>
                                <HistoryDialog
                                    onClose={handleCloseHistoryDialog}
                                    open={openHistoryDialog}
                                    mode="edit"
                                    bukken={otherObject?.bukken}
                                    loadData={() => reloadHistory(otherObject)}
                                    otherObjectId={otherObject?.id}
                                    objectKind={otherObject.object_kind}
                                />
                            </Box>
                            <BukkenHistoryListTable
                                bukken={otherObject?.bukken}
                                bukkenHistory={paginatedBukkenHistory}
                                bukkenHistoryCount={bukkenHistory.length}
                                onPageChange={handlePageHistoryChange}
                                onRowsPerPageChange={
                                    handleRowsPerPageHistoryChange
                                }
                                rowsPerPage={rowsPerPageHistory}
                                page={pageHistory}
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
OtherObjectNormalDetails.getLayout = (page) => (
    <DashboardLayout>{page}</DashboardLayout>
);

OtherObjectNormalDetails.propTypes = {
    id: PropTypes.string,
    otherObjectKind: PropTypes.string,
};

export default OtherObjectNormalDetails;
