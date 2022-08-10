import React from "react";
import OtherObjectOrderDetails from "../../../../components/other-object/order-detail";
import {OtherObjectKind} from "../../../../utils/bukken";
import {useRouter} from "next/router";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { AuthGuard } from "components/authentication/auth-guard";

const Page = () => {
    const router = useRouter();
    const {furnitureId} = router.query;
    return (
        <OtherObjectOrderDetails
            id={furnitureId}
            otherObjectKind={OtherObjectKind.Furniture}
        />
    );
};

Page.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);
export default Page;
