import {useEffect, useState} from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Grid,
    Typography,
    Checkbox,
    FormControlLabel,
    Link,
} from "@mui/material";
import {DashboardLayout} from "../../../../components/dashboard/dashboard-layout";
import {gtm} from "../../../../lib/gtm";
import {ArrowLeft as ArrowLeftIcon} from "../../../../icons/arrow-left";
import {AuthGuard} from "../../../../components/authentication/auth-guard";
import {Upload as UploadIcon} from "../../../../icons/upload";
import {FileDropzone} from "../../../../components/file-dropzone";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import * as Yup from "yup";
import {useFormik} from "formik";
import {wait} from "../../../../utils/wait";
import toast from "react-hot-toast";
import {useInformation} from "hooks/use-information";
import moment from "moment";
import {useRouter} from "next/router";
import {useInformationFile} from "hooks/use-information-file";
import * as R from "ramda";

const CsInformationDetails = () => {
    const router = useRouter();
    const {id} = router.query;
    const {loading, information, updateInformation} = useInformation(id);
    const {getFilesFromS3, deleteFileFromS3, deleteFilesFromS3, uploadFiles} =
        useInformationFile();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        //update value to formik
        if (!information) return;
        formik.setValues({
            subject: information.subject,
            content: information.content,
            date: moment(information.scheduled_delivery_date).toDate(),
            importantInfoFlag: information.important_info_flag,
            submit: null,
        });
    }, [information]);

    useEffect(async () => {
        if (!id) return;
        const files = await getFilesFromS3(id);
        if (!R.isNil(files) && !R.isEmpty(files)) {
            setFiles(files);
        }
    }, [id]);

    const handleDrop = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleRemove = async (file) => {
        setFiles((prevFiles) =>
            prevFiles.filter((_file) => _file.path !== file.path)
        );
        await deleteFileFromS3(file);
    };

    const handleRemoveAll = async () => {
        setFiles([]);
        await deleteFilesFromS3(files);
    };

    const handleSave = async (draftFlag = 0) => {
        await updateInformation({...formik.values, id, draftFlag});
        //upload s3 file if
        const uploads = files.filter((file) => !file.uploaded);
        if (!R.isEmpty(uploads)) {
            await uploadFiles(uploads, id);
        }
    };

    const formik = useFormik({
        initialValues: {
            subject: "",
            content: "",
            files: files,
            date: new Date(),
            importantInfoFlag: false,
            submit: null,
        },
        validationSchema: Yup.object({
            subject: Yup.string().max(255).required("件名必須です。"),
            content: Yup.string().max(255).required("本文は必須です。"),
            files: Yup.array(),
            date: Yup.date(),
            importantInfoFlag: Yup.bool(),
        }),
        onSubmit: async (values, helpers) => {
            try {
                // NOTE: Make API request
                await wait(500);
                helpers.setStatus({success: true});
                helpers.setSubmitting(false);
                toast.success("送信しました！");
            } catch (err) {
                console.error(err);
                toast.error("Something went wrong!");
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        gtm.push({event: "page_view"});
    }, []);

    return (
        <>
            <Head>
                <title>grandsポータルサイト｜お知らせ詳細（CS）</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <form noValidate onSubmit={formik.handleSubmit}>
                        <Card>
                            <CardContent>
                                <Box sx={{mb: 4}}>
                                    <Typography variant="h6" mb={3}>
                                        お知らせ詳細
                                    </Typography>
                                    <Grid container spacing={3} mt={3}>
                                        <Grid item md={8} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="件名"
                                                name="subject"
                                                required
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                error={Boolean(
                                                    formik.touched.subject &&
                                                        formik.errors.subject
                                                )}
                                                helperText={
                                                    formik.touched.subject &&
                                                    formik.errors.subject
                                                }
                                                value={formik.values.subject}
                                            />
                                        </Grid>
                                        <Grid item md={8} xs={12}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                minRows={4}
                                                label="本文"
                                                name="content"
                                                required
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                error={Boolean(
                                                    formik.touched.content &&
                                                        formik.errors.content
                                                )}
                                                helperText={
                                                    formik.touched.content &&
                                                    formik.errors.content
                                                }
                                                value={formik.values.content}
                                            />
                                        </Grid>
                                        <Grid item md={8} xs={12}>
                                            <Typography
                                                variant="body2"
                                                sx={{mb: 1}}
                                            >
                                                添付ファイル
                                            </Typography>
                                            <FileDropzone
                                                accept={{
                                                    "application/pdf": [".pdf"],
                                                    "image/png": [".png"],
                                                    "image/png": [".peg"],
                                                    "image/png": [".jpeg"],
                                                }}
                                                files={files}
                                                onDrop={handleDrop}
                                                onRemove={handleRemove}
                                                onRemoveAll={handleRemoveAll}
                                            />
                                        </Grid>
                                        <Grid item md={8} xs={12}>
                                            <MobileDatePicker
                                                label="配達予定日"
                                                inputFormat="yyyy/MM/dd"
                                                value={formik.values.date}
                                                onChange={(date) =>
                                                    formik.setFieldValue(
                                                        "date",
                                                        date
                                                    )
                                                }
                                                renderInput={(inputProps) => (
                                                    <TextField
                                                        {...inputProps}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box sx={{mt: 2}}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="emailAlerts"
                                                    checked={
                                                        formik.values
                                                            .importantInfoFlag
                                                    }
                                                    onChange={() =>
                                                        formik.setFieldValue(
                                                            "importantInfoFlag",
                                                            !formik.values
                                                                .importantInfoFlag
                                                        )
                                                    }
                                                />
                                            }
                                            label="重要なお知らせのため停止したユーザーにもメール送信"
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: {
                                                xs: "column",
                                                md: "row",
                                            },
                                            alignItems: {
                                                xs: "start",
                                                md: "center",
                                            },
                                        }}
                                    >
                                        <Typography variant="subtitle1">
                                            送信対象取込
                                            <Button
                                                startIcon={
                                                    <UploadIcon fontSize="small" />
                                                }
                                                sx={{m: 1}}
                                            >
                                                Import
                                            </Button>
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            送信先：
                                            <NextLink href="#" passHref>
                                                <Link variant="subtitle2">
                                                    102件
                                                </Link>
                                            </NextLink>
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                        <Box
                            sx={{
                                mx: -1,
                                mb: -1,
                                mt: 3,
                            }}
                        >
                            <Grid container spacing={3}>
                                <Grid item>
                                    <NextLink
                                        href="/cs/information/list"
                                        passHref
                                    >
                                        <Button
                                            endIcon={
                                                <ArrowLeftIcon fontSize="small" />
                                            }
                                            variant="outlined"
                                        >
                                            戻る
                                        </Button>
                                    </NextLink>
                                </Grid>
                                <Grid item sx={{m: -1}}>
                                    <Button
                                        sx={{m: 1}}
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleSave(1)}
                                    >
                                        下書き保存
                                    </Button>
                                </Grid>
                                <Grid item sx={{m: -1}}>
                                    <Button
                                        sx={{m: 1}}
                                        variant="contained"
                                        type="submit"
                                        onClick={() => handleSave(0)}
                                    >
                                        送信
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </Container>
            </Box>
        </>
    );
};
CsInformationDetails.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CsInformationDetails;
