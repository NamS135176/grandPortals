import {useEffect, useState, useCallback} from "react";
import Head from "next/head";
import {Box, Container} from "@mui/material";
import {DashboardLayout} from "../../../components/dashboard/dashboard-layout";
import {ProfileForm} from "../../../components/profile/profile-form";
import {gtm} from "../../../lib/gtm";
import {useMounted} from "../../../hooks/use-mounted";
import {bukkenApi} from "../../../__fake-api__/bukken-api";
import {AuthGuard} from "components/authentication/auth-guard";
import { useAuth } from "hooks/use-auth";

const ProfileRegist = () => {
	const { user } = useAuth();

    useEffect(() => {
        gtm.push({event: "page_view"});
    }, []);

    return (
        <>
            <Head>
                <title>grandsポータルサイト｜プロフィール登録</title>
            </Head>
            <Box
                component="main"
                sx={{
                    backgroundColor: "background.default",
                    flexGrow: 1,
                    py: {xs: 4, md: 8},
                }}
            >
                <Container maxWidth="md">
                    <ProfileForm user={user} />
                </Container>
            </Box>
        </>
    );
};

ProfileRegist.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default ProfileRegist;
