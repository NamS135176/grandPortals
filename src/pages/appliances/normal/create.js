import { AuthGuard } from "components/authentication/auth-guard";
import React from "react";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import CreateNormalOtherObject from "../../../components/other-object/normal-create";
import { OtherObjectKind } from "../../../utils/bukken";

const Page = () => (
    <CreateNormalOtherObject otherObjectKind={OtherObjectKind.HomeAppliances} />
);

Page.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);
export default Page;