import React from "react";
import OtherObjectOrderDetails from "../../../../components/other-object/order-detail";
import {OtherObjectKind} from "../../../../utils/bukken";
import {useRouter} from "next/router";

export default () => {
    const router = useRouter();
    const {furnitureId} = router.query;
    return (
        <OtherObjectOrderDetails
            id={furnitureId}
            otherObjectKind={OtherObjectKind.Furniture}
        />
    );
};
