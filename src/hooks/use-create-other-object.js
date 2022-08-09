import {API, Storage} from "aws-amplify";
import {useCallback, useMemo, useState} from "react";
import * as mutations from "../graphql/mutations";
import {
    getCoverImageS3FileNameForCreateOtherObject,
    getKindCaption,
    getOtherObjectListUrl,
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
        return getKindCaption(otherObjectKind);
    }, [otherObjectKind]);

    const backUrl = useMemo(() => {
        return getOtherObjectListUrl(otherObjectKind);
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
                            otherObjectKind,
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
                            user_id: bukken.user_id,
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
        [otherObjectKind]
    );

    return {
        loading,
        createOtherObject,
    };
};
