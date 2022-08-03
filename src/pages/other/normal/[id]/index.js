import React from "react";
import OtherObjectNormalDetails from "../../../../components/other-object/normal-detail";
import { OtherObjectKind } from "../../../../utils/bukken";
import { useRouter } from "next/router";

export default () => {
    const router = useRouter();
    const {id} = router.query;
    return (
        <OtherObjectNormalDetails
            id={id}
            otherObjectKind={OtherObjectKind.Other}
        />
    );
};
