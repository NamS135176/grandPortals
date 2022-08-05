import React from "react";
import OtherObjectNormalDetails from "../../../../components/other-object/normal-detail";
import { OtherObjectKind } from "../../../../utils/bukken";
import { useRouter } from "next/router";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";

const Page = () => {
    const router = useRouter();
    const {id} = router.query;
    return (
        <OtherObjectNormalDetails
            id={id}
            otherObjectKind={OtherObjectKind.Other}
        />
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
