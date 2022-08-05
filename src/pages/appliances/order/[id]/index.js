import React from "react";
import OtherObjectOrderDetails from "../../../../components/other-object/order-detail";
import {OtherObjectKind} from "../../../../utils/bukken";
import {useRouter} from "next/router";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";

const Page = () => {
    const router = useRouter();
    const {id} = router.query;
    return (
        <OtherObjectOrderDetails
            id={id}
            otherObjectKind={OtherObjectKind.HomeAppliances}
        />
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;