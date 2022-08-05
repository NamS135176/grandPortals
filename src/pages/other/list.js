import React from "react";
import OtherObjectList from "../../components/other-object/list";
import {OtherObjectKind} from "../../utils/bukken";
import {DashboardLayout} from "../../components/dashboard/dashboard-layout";

const Page = () => <OtherObjectList otherObjectKind={OtherObjectKind.Other} />;

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
