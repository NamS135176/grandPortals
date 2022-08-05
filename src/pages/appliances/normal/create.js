import React from "react";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import CreateNormalOtherObject from "../../../components/other-object/normal-create";
import { OtherObjectKind } from "../../../utils/bukken";

const Page = () => (
    <CreateNormalOtherObject otherObjectKind={OtherObjectKind.HomeAppliances} />
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;