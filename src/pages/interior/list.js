import {useCallback, useEffect, useState} from "react";
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
import {InteriorListTable} from "../../components/interior/interior-list-table";
import {gtm} from "../../lib/gtm";
import {ManagementList} from "../../components/management-menu";
import {useInteriorList} from "../../hooks/use-interior-list";
import { useRoomDefault } from "../../hooks/use-room-default";

const applyPagination = (bukken, page, rowsPerPage) =>
    bukken.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const InteriorList = () => {
    const { room } = useRoomDefault();

    // const { bukken } = useBukkenDefault();
    const {interiors: interior, deleteInterior} = useInteriorList(room?.id);
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
    const paginatedInterior = applyPagination(interior, page, rowsPerPage);

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
                                    建具・インテリア一覧
                                </Typography>
                                <Box>
                                    <NextLink href={`/interior/normal/create`} passHref>
                                        <Button variant="contained" sx={{mr: 2}}>
                                            既製品新規登録

                                        </Button>
                                    </NextLink>
                                    <NextLink href={`/interior/order/create`} passHref>
                                        <Button variant="contained">
                                            オーダー製品新規登録
                                        </Button>
                                    </NextLink>
                                </Box>
                            </Box>
                            <InteriorListTable
                                interior={paginatedInterior}
                                interiorCount={interior.length}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                deleteInterior={deleteInterior}
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
InteriorList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default InteriorList;
