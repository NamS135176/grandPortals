import {useCallback, useEffect, useMemo, useState} from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Typography,
} from "@mui/material";
import {DashboardLayout} from "../../components/dashboard/dashboard-layout";
import {gtm} from "../../lib/gtm";
import {ManagementList} from "../../components/management-menu";
import PropTypes from "prop-types";
import {useOtherObjectList} from "../../hooks/use-other-object-list";
import {OtherObjectListTable} from "./other-object-list-table";
import {useBukkenDefault} from "../../hooks/use-bukken-default";
import {OtherObjectKind} from "../../utils/bukken";

const applyPagination = (bukken, page, rowsPerPage) =>
    bukken.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const OtherObjectList = ({otherObjectKind}) => {
    const {bukken} = useBukkenDefault();
    const {otherObjects} = useOtherObjectList(bukken?.id, otherObjectKind);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        gtm.push({event: "page_view"});
    }, []);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    // Usually query is done on backend with indexing solutions
    const paginatedOtherObject = applyPagination(
        otherObjects,
        page,
        rowsPerPage
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

    const route = useMemo(() => {
        switch (otherObjectKind) {
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
    }, [otherObjectKind]);

    return (
        <>
            <Head>
                <title>grandsポータルサイト｜建具・インテリア</title>
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
                    <Card sx={{mt: 4}}></Card>
                    <Card>
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
                                    {kindCaption}・インテリア一覧
                                </Typography>
                                <Box>
                                    <NextLink
                                        href={`${route}/normal/create`}
                                        passHref
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{mr: 2}}
                                        >
                                            既製品新規登録
                                        </Button>
                                    </NextLink>
                                    <NextLink
                                        href={`${route}/order/create`}
                                        passHref
                                    >
                                        <Button variant="contained">
                                            オーダー製品新規登録
                                        </Button>
                                    </NextLink>
                                </Box>
                            </Box>
                            <OtherObjectListTable
                                otherObject={paginatedOtherObject}
                                interiorCount={otherObjects.length}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                rowsPerPage={rowsPerPage}
                                page={page}
                            />
                        </CardContent>
                    </Card>
                    <Box
                        sx={{
                            mx: -1,
                            mb: -1,
                            mt: 3,
                        }}
                    >
                        <NextLink href="/" passHref>
                            <Button sx={{m: 1}} variant="contained">
                                TOP
                            </Button>
                        </NextLink>
                    </Box>
                </Container>
            </Box>
        </>
    );
};
OtherObjectList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

OtherObjectList.propTypes = {
    otherObjectKind: PropTypes.string,
};
export default OtherObjectList;
