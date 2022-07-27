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
import {getOtherObjectS3FileName, getUrlPath} from "../utils/bukken";
import moment from "moment";
import toast, {Toaster} from "react-hot-toast";
import {useRouter} from "next/router";
import {resizeImage} from "../utils/image";

export const useRoomDetail = (roomId) => {
    const router = useRouter();
    const isMounted = useMounted();
    const [room, setRoom] = useState();
    const [coverImageUrl, setCoverImageUrl] = useState();
    const [histories, setHistories] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    const deleteHistory = useCallback(
        async (history) => {
            try {
                await API.graphql({
                    query: mutations.updateHistory,
                    variables: {
                        input: {
                            id: history.id,
                            delete_flag: 1,
                        },
                    },
                });
                const newHistories = R.reject(R.propEq("id", history.id))(
                    histories
                );
                setHistories(newHistories);
            } catch (e) {
                console.error(e);
            }
        },
        [histories]
    );

    const deleteDocument = useCallback(
        async (document) => {
            try {
                const {s3_file_name} = document;
                await API.graphql({
                    query: mutations.updateDocument,
                    variables: {
                        input: {
                            id: document.id,
                            delete_flag: 1,
                        },
                    },
                });
                const newDocuments = R.reject(R.propEq("id", document.id))(
                    documents
                );
                setDocuments(newDocuments);

                //delete s3 also
                await Storage.remove(s3_file_name, {level: "public"});
            } catch (e) {
                console.error(e);
            }
        },
        [documents]
    );

    const getListDocument = useCallback(
        async (room, list = [], nextToken = null) => {
            if (!room) return;
            const res = await API.graphql({
                query: queryDocumentByOtherObjectId,
                variables: {
                    other_object_id: room.id,
                    nextToken,
                    filter: {
                        delete_flag: {
                            eq: 0,
                        },
                    },
                },
            });
            const items = res.data.queryDocumentByOtherObjectId.items;
            if (items?.length > 0) {
                list = list.concat(items);
            }
            const nxtToken = res.data.queryDocumentByOtherObjectId.nextToken;
            if (nxtToken) {
                await getListDocument(room, list, nxtToken); //load util nextToken is null
            }
            return list;
        },
        []
    );

    const getListHistory = useCallback(
        async (room, list = [], nextToken = null) => {
            if (!room) return;
            const res = await API.graphql({
                query: queryHistoryByOtherObjectId,
                variables: {
                    other_object_id: room.id,
                    nextToken,
                    filter: {
                        delete_flag: {
                            eq: 0,
                        },
                    },
                },
            });
            const items = res.data.queryHistoryByOtherObjectId.items;
            if (items?.length > 0) {
                list = list.concat(items);
            }
            const nxtToken = res.data.queryHistoryByOtherObjectId.nextToken;
            if (nxtToken) {
                await getListHistory(room, list, nxtToken); //load util nextToken is null
            }
            return list;
        },
        []
    );

    const reloadDocument = useCallback(async (room, updateLoading = true) => {
        if (updateLoading) setLoading(true);
        const documents = await getListDocument(room);
        if (documents?.length > 0) {
            setDocuments(documents);
        }
        if (updateLoading) setLoading(false);
    }, []);

    const reloadHistory = useCallback(async (room, updateLoading = true) => {
        if (updateLoading) setLoading(true);
        const histories = await getListHistory(room);
        console.log(room);
        if (histories?.length > 0) {
            setHistories(histories);
        }
        if (updateLoading) setLoading(false);
    }, []);

    const loadData = useCallback(async () => {
        setLoading(true);

        //load room detail
        const response = await API.graphql({
            query: getOtherObject,
            variables: {
                id: roomId,
            },
        });
        const room = response.data.getOtherObject;
        if (!room) {
            //not found
            router.replace("/404");
            return;
        }
        preSetRoom(room);
        setRoom(room);
        if (room.field_list["thumnail"]) {
            setCoverImageUrl(room.field_list["thumnail"]);
        }
        //end room detail

        reloadHistory(room, false);

        reloadDocument(room, false);

        setLoading(false);
    }, [roomId]);

    const preSetRoom = useCallback((room) => {
        try {
            //parse field_list to get cover image with thumnail key
            const fieldList = room.field_list
                ? JSON.parse(room.field_list)
                : {};
            room.field_list = fieldList;
        } catch (e) {
            console.error(e);
        }
    }, []);

    const uploadRoomCover = useCallback(
        async (file) => {
            try {
                const originFileName = `${file.name.replace(/ |　/g, "")}`;
                const s3FileNamePrefix = moment().format("YYYYMMDD_HHmmss");
                const s3FileName = getOtherObjectS3FileName(
                    room,
                    `${s3FileNamePrefix}_${originFileName}`
                );

                //resize image first
                file = await resizeImage(file, 1280, 85);

                await Storage.put(s3FileName, file, {
                    level: "public",
                    contentType: file.type,
                });
                const urlPath = getUrlPath(s3FileName);

                setCoverImageUrl(urlPath);

                //update other object for update field_list
                const fieldList = room.field_list;
                fieldList["thumnail"] = urlPath;

                updateRoomFieldList(fieldList, false, false);
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        [room]
    );

    const updateRoom = useCallback(async (fieldList) => {
        const res = await API.graphql({
            query: mutations.updateOtherObject,
            variables: {
                input: {
                    id: room.id,
                    fieldList: fieldList,
                },
            },
        });
        toast.success("物件情報を登録しました。");
        router.push("/room/list");
    });

    const updateRoomFieldList = useCallback(
        async (
            roomFieldList,
            updateLoading = true,
            navigateToListRoom = true
        ) => {
            if (updateLoading) setLoading(true);
            try {
                const resOtherObject = await API.graphql({
                    query: mutations.updateOtherObject,
                    variables: {
                        input: {
                            id: room.id,
                            field_list: JSON.stringify(roomFieldList),
                        },
                    },
                });
                const updateRoom = resOtherObject.data.updateOtherObject;
                preSetRoom(updateRoom);
                setRoom(updateRoom);
                toast.success("物件情報を登録しました。");
                if (navigateToListRoom) {
                    router.push("/room/list");
                }
            } catch (e) {
                console.error(e);
                throw e;
            }
            if (updateLoading) setLoading(false);
        },
        [room]
    );

    useEffect(() => {
        if (isMounted && roomId) loadData();
    }, [isMounted, roomId]);

    return {
        room,
        coverImageUrl,
        histories,
        documents,
        deleteHistory,
        deleteDocument,
        loading,
        loadData,
        reloadDocument,
        reloadHistory,
        uploadRoomCover,
        updateRoomFieldList,
        updateRoom,
    };
};
