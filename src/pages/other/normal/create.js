import React from "react";
import CreateNormalOtherObject from "../../../components/other-object/normal-create";
import { OtherObjectKind } from "../../../utils/bukken";

export default () => {
    return (
        <CreateNormalOtherObject otherObjectKind={OtherObjectKind.Other} />
    );
};
