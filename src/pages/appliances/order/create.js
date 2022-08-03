import React from "react";
import CreateOrderOtherObject from "../../../components/other-object/order-create";
import {OtherObjectKind} from "../../../utils/bukken";

export default () => {
    return (
        <CreateOrderOtherObject otherObjectKind={OtherObjectKind.HomeAppliances} />
    );
};
