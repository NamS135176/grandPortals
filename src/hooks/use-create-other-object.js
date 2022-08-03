import {API, Storage} from "aws-amplify";
import {useCallback, useMemo, useState} from "react";
import * as mutations from "../graphql/mutations";
import {
    getCoverImageS3FileNameForCreateOtherObject,
    getUrlPath,
    OtherObjectKind,
} from "../utils/bukken";
import moment from "moment";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {resizeImage} from "../utils/image";
import {useAuth} from "./use-auth";
import {getNextOtherObjectId} from "../utils/id-generator";

export const useCreateOtherObject = (otherObjectKind) => {
    const {user} = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const kindCaption = useMemo(() => {
        switch (otherObjectKind) {
            case OtherObjectKind.Interior:
                return "建具";
            case OtherObjectKind.Furniture:
                return "家具一覧";
            case OtherObjectKind.HomeAppliances:
                return "家電一覧";
            case OtherObjectKind.Facilities:
                return "設備一覧";
            case OtherObjectKind.Other:
                return "その他一覧";
            default:
                return "";
        }
    }, [otherObjectKind]);

    const backUrl = useMemo(() => {
        switch (otherObjectKind) {
            case OtherObjectKind.Interior:
                return "/interior/list";
            case OtherObjectKind.Furniture:
                return "/furniture/list";
            case OtherObjectKind.HomeAppliances:
                return "/appliances/list";
            case OtherObjectKind.Facilities:
                return "/facility/list";
            case OtherObjectKind.Other:
                return "/other/list";
            default:
                return "";
        }
    }, [otherObjectKind]);

    const createOtherObject = useCallback(
        async (bukken, fieldKind, fieldList, file) => {
            console.log('createOtherObject... ', {bukken, fieldKind, fieldList, file})
            setLoading(true);
            try {
                const nextId = await getNextOtherObjectId();

                var thumnail = null;

                if (file) {
                    const originFileName = `${file.name.replace(/ |　/g, "")}`;
                    const s3FileNamePrefix = moment().format("YYYYMMDD_HHmmss");
                    const s3FileName =
                        getCoverImageS3FileNameForCreateOtherObject(
                            bukken,
                            nextId,
                            `${s3FileNamePrefix}_${originFileName}`
                        );

                    //resize image first
                    file = await resizeImage(file, 1280, 85);

                    await Storage.put(s3FileName, file, {
                        level: "public",
                        contentType: file.type,
                    });
                    thumnail = getUrlPath(s3FileName);
                }
                let newFieldList = {...fieldList, thumnail};
                const updatedAt = moment().utc().format("YYYYMMDDTHHmmss");
                await API.graphql({
                    query: mutations.createOtherObject,
                    variables: {
                        input: {
                            id: nextId,
                            user_id: user.id,
                            bukken_id: bukken.id,
                            delete_flag: 0,
                            object_kind: otherObjectKind,
                            field_kind: fieldKind,
                            field_list: JSON.stringify(newFieldList),
                            sort: 1, //always 1
                            object_kind_updatedAt: `${otherObjectKind}#${updatedAt}`, //0#20221201T102309
                        },
                    },
                });
                //upload image
                toast.success(`${kindCaption}・インテリアを登録しました。`);
                router.push(backUrl);
            } catch (e) {
                console.error(e);
                // toast.error(e.message);
                
                throw e;
            }
            setLoading(false);
        },
        []
    );

    return {
        loading,
        createOtherObject,
    };
};
