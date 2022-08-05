import React from "react";
import CreateOrderOtherObject from "../../../components/other-object/order-create";
import {OtherObjectKind} from "../../../utils/bukken";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";

const Page = () => (
    <CreateOrderOtherObject otherObjectKind={OtherObjectKind.Other} />
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;