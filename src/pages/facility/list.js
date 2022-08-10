import React from "react";
import OtherObjectList from "../../components/other-object/list";
import {OtherObjectKind} from "../../utils/bukken";
import {DashboardLayout} from "../../components/dashboard/dashboard-layout";
import { AuthGuard } from "components/authentication/auth-guard";

const Page = () => (
    <OtherObjectList otherObjectKind={OtherObjectKind.Facilities} />
);

Page.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);
export default Page;
