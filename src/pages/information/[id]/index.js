import {useEffect, useState} from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import {DashboardLayout} from "../../../components/dashboard/dashboard-layout";
import {gtm} from "../../../lib/gtm";
import {ArrowLeft as ArrowLeftIcon} from "../../../icons/arrow-left";
import {AuthGuard} from "../../../components/authentication/auth-guard";
import {Download as DownloadIcon} from "../../../icons/download";
import {useInformationFile} from "hooks/use-information-file";
import {useInformation} from "hooks/use-information";
import {useRouter} from "next/router";
import {useMounted} from "hooks/use-mounted";
import * as R from "ramda";
import moment from "moment";

const InformationDetails = () => {
    const isMounted = useMounted();
    const router = useRouter();
    const {id} = router.query;

    const {information} = useInformation(id);
    console.log(information);
    const {getFilesFromS3, zipInformationFile} = useInformationFile();

    const [files, setFiles] = useState([]);
    const [zipUrl, setZipUrl] = useState();

    useEffect(() => {
        gtm.push({event: "page_view"});
    }, []);

    useEffect(async () => {
        if (!information) return;
        //check scheduled_delivery_date
        if (moment(information.scheduled_delivery_date).isAfter(moment().utc(new Date()))) {
            //not available this time
            router.push("/404");
            return;
        }
    }, [information]);

    useEffect(async() => {
      //call api zip file if need
      const zipUrl = await zipInformationFile(id);
      setZipUrl(zipUrl);
    }, [id])
    

    useEffect(async () => {
        if (!isMounted()) return;
        const files = await getFilesFromS3(id);
        if (!R.isNil(files) && !R.isEmpty(files)) {
            setFiles(files);
        }
    }, [isMounted]);

    // console.log("InformationDetails... ", {information, files});

    const renderDownloadDocument = () => {
        if (R.isEmpty(files)) return <></>;
        if (files.length == 1) {
            return (
                <NextLink href={files[0].path} passHref target="_blank">
                    <a target="_blank" rel="noopener noreferrer">
                        <Button
                            startIcon={<DownloadIcon fontSize="small" />}
                            sx={{m: 1}}
                        >
                            資料ダウンロード
                        </Button>
                    </a>
                </NextLink>
            );
        }
        return zipUrl ? (
            <NextLink href={zipUrl} target="_blank" passHref>
                <a target="_blank" rel="noopener noreferrer">
                    <Button
                        startIcon={<DownloadIcon fontSize="small" />}
                        sx={{m: 1}}
                    >
                        資料ダウンロード
                    </Button>
                </a>
            </NextLink>
        ) : (
            <></>
        );
    };

    return (
        <>
            <Head>
                <title>grandsポータルサイト｜お知らせ情報</title>
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
                            お問い合わせ：050-5443-5974
                        </Typography>
                    </Box>
                    <Card sx={{mt: 4}}>
                        <CardContent>
                            <Box sx={{mb: 4}}>
                                <Grid
                                    container
                                    justifyContent="space-between"
                                    spacing={3}
                                >
                                    <Grid item>
                                        <Typography variant="h6" mb={3}>
                                            お知らせ情報
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Typography>{information?.subject}</Typography>
                                <Divider
                                    sx={{
                                        mb: 3,
                                        mt: 3,
                                    }}
                                />
                                <Typography
                                    color="textSecondary"
                                    sx={{mt: 1, whiteSpace: "pre-wrap"}}
                                    variant="body2"
                                >
                                    {information?.content}
                                </Typography>

                                {renderDownloadDocument()}
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
                        <NextLink href="/information/list" passHref>
                            <Button
                                endIcon={<ArrowLeftIcon fontSize="small" />}
                                variant="outlined"
                            >
                                戻る
                            </Button>
                        </NextLink>
                    </Box>
                </Container>
            </Box>
        </>
    );
};
InformationDetails.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default InformationDetails;
