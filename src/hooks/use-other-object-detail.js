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
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {resizeImage} from "../utils/image";

export const useOtherObjectDetail = (id, otherObjectKind) => {
    const router = useRouter();
    const isMounted = useMounted();
    const [otherObject, setOtherObject] = useState();
    const [coverImageUrl, setCoverImageUrl] = useState();
    const [histories, setHistories] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadingCoverImage, setUploadingCoverImage] = useState(false);

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
            } catch (e) {
                console.error(e);
            }
        },
        [documents]
    );

    const getListDocument = useCallback(
        async (otherObject, list = [], nextToken = null) => {
            if (!otherObject) return;
            const res = await API.graphql({
                query: queryDocumentByOtherObjectId,
                variables: {
                    other_object_id: otherObject.id,
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
                await getListDocument(otherObject, list, nxtToken); //load util nextToken is null
            }
            return list;
        },
        []
    );

    const getListHistory = useCallback(
        async (otherObject, list = [], nextToken = null) => {
            if (!otherObject) return;
            const res = await API.graphql({
                query: queryHistoryByOtherObjectId,
                variables: {
                    other_object_id: otherObject.id,
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
                await getListHistory(otherObject, list, nxtToken); //load util nextToken is null
            }
            return list;
        },
        []
    );

    const reloadDocument = useCallback(
        async (otherObject, updateLoading = true) => {
            if (updateLoading) setLoading(true);
            const documents = await getListDocument(otherObject);
            if (documents?.length > 0) {
                setDocuments(documents);
            }
            if (updateLoading) setLoading(false);
        },
        []
    );

    const reloadHistory = useCallback(
        async (otherObject, updateLoading = true) => {
            if (updateLoading) setLoading(true);
            const histories = await getListHistory(otherObject);
            console.log(otherObject);
            if (histories?.length > 0) {
                setHistories(histories);
            }
            if (updateLoading) setLoading(false);
        },
        []
    );

    const loadData = useCallback(async () => {
        setLoading(true);

        //load otherObject detail
        const response = await API.graphql({
            query: getOtherObject,
            variables: {
                id: id,
            },
        });
        const otherObject = response.data.getOtherObject;
        if (
            !otherObject ||
            otherObject.delete_flag == 1 
            // ||otherObject.object_kind != otherObjectKind
        ) {
            //not found
            router.replace("/404");
            return;
        }
        preSetOtherObject(otherObject);
        setOtherObject(otherObject);
        if (otherObject.field_list["thumnail"]) {
            setCoverImageUrl(otherObject.field_list["thumnail"]);
        }
        //end otherObject detail

        reloadHistory(otherObject, false);

        reloadDocument(otherObject, false);

        setLoading(false);
    }, [id, otherObjectKind]);

    const preSetOtherObject = useCallback((otherObject) => {
        try {
            //parse field_list to get cover image with thumnail key
            const fieldList = otherObject.field_list
                ? JSON.parse(otherObject.field_list)
                : {};
            otherObject.field_list = fieldList;
        } catch (e) {
            console.error(e);
            otherObject.field_list = {};
        }
    }, []);

    const uploadOtherObjectCover = useCallback(
        async (file) => {
            setUploadingCoverImage(true);
            try {
                const originFileName = `${file.name.replace(/ |　/g, "")}`;
                const s3FileNamePrefix = moment().format("YYYYMMDD_HHmmss");
                const s3FileName = getOtherObjectS3FileName(
                    otherObject,
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
                const fieldList = otherObject.field_list;
                fieldList["thumnail"] = urlPath;

                updateOtherObjectFieldList(fieldList, false, false);
            } catch (e) {
                console.error(e);
                toast.error(e.message);
            }
            setUploadingCoverImage(false);
        },
        [otherObject]
    );

    const updateOtherObjectFieldList = useCallback(
        async (
            otherObjectFieldList,
            updateLoading = true,
            navigateToListOtherObject = true
        ) => {
            if (updateLoading) setLoading(true);
            try {
                const resOtherObject = await API.graphql({
                    query: mutations.updateOtherObject,
                    variables: {
                        input: {
                            id: otherObject.id,
                            field_list: JSON.stringify(otherObjectFieldList),
                        },
                    },
                });
                const updateOtherObject = resOtherObject.data.updateOtherObject;
                preSetOtherObject(updateOtherObject);
                setOtherObject(updateOtherObject);
                toast.success("物件情報を登録しました。");
                if (navigateToListOtherObject) {
                    router.push("/otherObject/list");
                }
            } catch (e) {
                console.error(e);
                throw e;
            }
            if (updateLoading) setLoading(false);
        },
        [otherObject]
    );

    useEffect(() => {
        if (isMounted && id) loadData();
    }, [isMounted, id]);

    return {
        otherObject,
        coverImageUrl,
        histories,
        documents,
        deleteHistory,
        deleteDocument,
        loading,
        uploadingCoverImage,
        loadData,
        reloadDocument,
        reloadHistory,
        uploadOtherObjectCover,
        updateOtherObjectFieldList,
    };
};
