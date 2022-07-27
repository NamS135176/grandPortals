import {API, Storage} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {
    getOtherObject,
    queryDocumentByOtherObjectId,
    queryHistoryByOtherObjectId,
} from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import {useMounted} from "./use-mounted";
import * as R from "ramda";
import {
    getCoverImageS3FileNameForCreateRoom,
    getOtherObjectS3FileName,
    getRoomCoverImageUrl,
    getS3FromUrl,
    getUrlPath,
    OtherObjectFieldKind,
    OtherObjectKind,
} from "../utils/bukken";
import moment from "moment";
import toast, {Toaster} from "react-hot-toast";
import {useRouter} from "next/router";
import {resizeImage} from "../utils/image";
import {useAuth} from "./use-auth";
import {getNextOtherObjectId} from "../utils/id-generator";

export const useCreateRoom = () => {
    const {user} = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const createRoom = useCallback(
        async (bukken, name, kind, remarks, file) => {
            setLoading(true);
            try {
                const nextId = await getNextOtherObjectId();

                var thumnail = null;

                if (file) {
                    const originFileName = `${file.name.replace(/ |　/g, "")}`;
                    const s3FileNamePrefix = moment().format("YYYYMMDD_HHmmss");
                    const s3FileName = getCoverImageS3FileNameForCreateRoom(
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

                const updatedAt = moment().utc().format("YYYYMMDDTHHmmss");
                const resOtherObject = await API.graphql({
                    query: mutations.createOtherObject,
                    variables: {
                        input: {
                            id: nextId,
                            user_id: user.id,
                            bukken_id: bukken.id,
                            bukken_no: bukken.bukken_no, //will delete later
                            delete_flag: 0,
                            object_kind: OtherObjectKind.RoomSpace,
                            field_kind: OtherObjectFieldKind.ReadyMadeProduct,
                            field_list: JSON.stringify({
                                name,
                                kind,
                                remarks,
                                thumnail,
                            }),
                            sort: 1, //always 1
                            object_kind_updatedAt: `${OtherObjectKind.RoomSpace}#${updatedAt}`, //0#20221201T102309
                        },
                    },
                });
                const room = resOtherObject.data.createOtherObject;
                //upload image
                toast.success("部屋・スペースを登録しました。");
                router.push("/room/list");
            } catch (e) {
                toast.error(e.message);
                console.error(e);
                // throw e;
            }
            setLoading(false);
        },
        []
    );

    return {
        loading,
        createRoom,
    };
};
