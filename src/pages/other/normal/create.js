import React from "react";
import CreateNormalOtherObject from "../../../components/other-object/normal-create";
import { OtherObjectKind } from "../../../utils/bukken";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { AuthGuard } from "components/authentication/auth-guard";

const Page = () => (
    <CreateNormalOtherObject otherObjectKind={OtherObjectKind.Other} />
);

Page.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);
export default Page;