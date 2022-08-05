import React from "react";
import CreateNormalOtherObject from "../../../components/other-object/normal-create";
import {OtherObjectKind} from "../../../utils/bukken";
import {DashboardLayout} from "../../../components/dashboard/dashboard-layout";

const Page = () => (
    <CreateNormalOtherObject otherObjectKind={OtherObjectKind.Furniture} />
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
