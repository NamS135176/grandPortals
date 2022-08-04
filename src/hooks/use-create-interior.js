import {API, Storage} from "aws-amplify";
import {useCallback, useState} from "react";
import * as mutations from "../graphql/mutations";
import {
    getCoverImageS3FileNameForCreateInterior,
    getUrlPath,
    OtherObjectKind,
} from "../utils/bukken";
import moment from "moment";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {resizeImage} from "../utils/image";
import {useAuth} from "./use-auth";
import {getNextOtherObjectId} from "../utils/id-generator";

export const useCreateInterior = () => {
    const {user} = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const createInterior = useCallback(async (bukken, fieldKind, fieldList, file, roomId = null) => {
        setLoading(true);
        try {
            const nextId = await getNextOtherObjectId();

            var thumnail = null;

            if (file) {
                const originFileName = `${file.name.replace(/ |　/g, "")}`;
                const s3FileNamePrefix = moment().format("YYYYMMDD_HHmmss");
                const s3FileName = getCoverImageS3FileNameForCreateInterior(
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
                        object_kind: OtherObjectKind.Interior,
                        field_kind: fieldKind,
                        field_list: JSON.stringify(newFieldList),
                        room_id: roomId,
                        sort: 1, //always 1
                        object_kind_updatedAt: `${OtherObjectKind.Interior}#${updatedAt}`, //0#20221201T102309
                    },
                },
            });
            //upload image
            toast.success("建具・インテリアを登録しました。");
            router.push(`/interior/list`);
        } catch (e) {
            toast.error(e.message);
            console.error(e);
            // throw e;
        }
        setLoading(false);
    }, []);

    return {
        loading,
        createInterior,
    };
};
