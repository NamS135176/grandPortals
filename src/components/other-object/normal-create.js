import {useCallback, useEffect, useMemo, useState} from "react";
import Head from "next/head";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";
import {DashboardLayout} from "../dashboard/dashboard-layout";
import {ManagementList} from "../management-menu";
import {ArrowLeft as ArrowLeftIcon} from "../../icons/arrow-left";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import {FileUpload} from "../widgets/file-upload";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import * as Yup from "yup";
import * as R from "ramda";
import {useBukkenDefault} from "../../hooks/use-bukken-default";
import PropTypes from "prop-types";
import {gtm} from "../../lib/gtm";
import {getKindCaption, getOtherObjectListUrl, getOtherObjectSelectKind, OtherObjectFieldKind, OtherObjectKind} from "../../utils/bukken";
import {useCreateOtherObject} from "../../hooks/use-create-other-object";
import { UserGroup } from "../../utils/global-data";
import { useAuth } from "../../hooks/use-auth";

const CreateNormalOtherObject = ({otherObjectKind}) => {
    const {user} = useAuth();
    const router = useRouter();
    const {loading, createOtherObject} = useCreateOtherObject(otherObjectKind);
    const {bukken} = useBukkenDefault();

    const [file, setFile] = useState();
    const [coverImage, setCoverImage] = useState();

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
            last_construction_date: null,
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

    const handleDateChange = (date) => {
        formik.setFieldValue("date", date);
    };

    const handleSubmit = (values) => {
        createOtherObject(
            bukken,
            OtherObjectFieldKind.ReadyMadeProduct,
            values,
            file
        );
    };

    const handleChangeFile = (file) => {
        setFile(file);
        setCoverImage(URL.createObjectURL(file));
    };

    const kindCaption = useMemo(() => {
        return getKindCaption(otherObjectKind);
    }, [otherObjectKind]);

    const backUrl = useMemo(() => {
        return getOtherObjectListUrl(otherObjectKind);
    }, [otherObjectKind]);

    const otherObjectSelect = useMemo(() => {
        return getOtherObjectSelectKind(otherObjectKind);
    }, [otherObjectKind]);

    return (
        <>
            <Head>
                <title>grandsポータルサイト｜{kindCaption}情報</title>
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
                                            {kindCaption}情報（既製品）
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            disabled={loading}
                                        >
                                            画像追加
                                            <FileUpload
                                                accept={"image/*"}
                                                onChange={handleChangeFile}
                                                prefix="image"
                                            >
                                                <></>
                                            </FileUpload>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box
                                sx={{
                                    backgroundImage: `url(${coverImage})`,
                                    backgroundColor: "#D0D0D0",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    borderRadius: 1,
                                    height: 450,
                                    mt: 3,
                                }}
                            />
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
                                            {otherObjectSelect.map(
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
                                        label="名称"
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
                                {user.group === UserGroup.support && (
                                    <Grid item md={8} xs={12}>
                                        <MobileDatePicker
                                            label="最終施工日"
                                            inputFormat="MM/dd/yyyy"
                                            value={
                                                formik.values
                                                    .last_construction_date
                                            }
                                            onChange={(date) =>
                                                formik.setFieldValue(
                                                    "last_construction_date",
                                                    date
                                                )
                                            }
                                            renderInput={(inputProps) => (
                                                <TextField {...inputProps} />
                                            )}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </CardContent>
                    </Card>
                    <Box
                        sx={{
                            justifyContent: "flex-end",
                            width: "100%",
                            display: "flex",
                            mt: 2,
                        }}
                    >
                        <Button
                            endIcon={<ArrowLeftIcon fontSize="small" />}
                            onClick={() => router.push(backUrl)}
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
                </Container>
            </Box>
        </>
    );
};
CreateNormalOtherObject.getLayout = (page) => (
    <DashboardLayout>{page}</DashboardLayout>
);

CreateNormalOtherObject.propTypes = {
    otherObjectKind: PropTypes.string,
};
export default CreateNormalOtherObject;
