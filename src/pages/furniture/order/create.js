import React from "react";
import CreateOrderOtherObject from "../../../components/other-object/order-create";
import {OtherObjectKind} from "../../../utils/bukken";
import {DashboardLayout} from "../../../components/dashboard/dashboard-layout";
import { AuthGuard } from "components/authentication/auth-guard";

const Page = () => (
    <CreateOrderOtherObject otherObjectKind={OtherObjectKind.Furniture} />
);

Page.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);
export default Page;
