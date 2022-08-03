import React from "react";
import OtherObjectOrderDetails from "../../../../components/other-object/order-detail";
import {OtherObjectKind} from "../../../../utils/bukken";
import {useRouter} from "next/router";

export default () => {
    const router = useRouter();
    const {id} = router.query;
    return (
        <OtherObjectOrderDetails
            id={id}
            otherObjectKind={OtherObjectKind.HomeAppliances}
        />
    );
};
