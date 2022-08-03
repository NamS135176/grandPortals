import React from "react";
import OtherObjectNormalDetails from "../../../../components/other-object/normal-detail";
import { OtherObjectKind } from "../../../../utils/bukken";
import { useRouter } from "next/router";

export default () => {
    const router = useRouter();
    const {furnitureId} = router.query;
    return (
        <OtherObjectNormalDetails
            id={furnitureId}
            otherObjectKind={OtherObjectKind.Furniture}
        />
    );
};
