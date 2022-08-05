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
    getOtherObjectS3FileName,
    getUrlPath,
    OtherObjectKind,
} from "../utils/bukken";
import moment from "moment";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {resizeImage} from "../utils/image";

export const useInteriorDetail = (interiorId) => {
    const router = useRouter();
    const isMounted = useMounted();
    const [interior, setInterior] = useState();
    const [coverImageUrl, setCoverImageUrl] = useState();
    const [histories, setHistories] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadCoverImage, setUploadCoverImage] = useState(false);

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
        async (interior, list = [], nextToken = null) => {
            if (!interior) return;
            const res = await API.graphql({
                query: queryDocumentByOtherObjectId,
                variables: {
                    other_object_id: interior.id,
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
                await getListDocument(interior, list, nxtToken); //load util nextToken is null
            }
            return list;
        },
        []
    );

    const getListHistory = useCallback(
        async (interior, list = [], nextToken = null) => {
            if (!interior) return;
            const res = await API.graphql({
                query: queryHistoryByOtherObjectId,
                variables: {
                    other_object_id: interior.id,
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
                await getListHistory(interior, list, nxtToken); //load util nextToken is null
            }
            return list;
        },
        []
    );

    const reloadDocument = useCallback(
        async (interior, updateLoading = true) => {
            if (updateLoading) setLoading(true);
            const documents = await getListDocument(interior);
            if (documents?.length > 0) {
                setDocuments(documents);
            }
            if (updateLoading) setLoading(false);
        },
        []
    );

    const reloadHistory = useCallback(
        async (interior, updateLoading = true) => {
            if (updateLoading) setLoading(true);
            const histories = await getListHistory(interior);
            console.log(interior);
            if (histories?.length > 0) {
                setHistories(histories);
            }
            if (updateLoading) setLoading(false);
        },
        []
    );

    const loadData = useCallback(async () => {
        setLoading(true);

        //load interior detail
        const response = await API.graphql({
            query: getOtherObject,
            variables: {
                id: interiorId,
            },
        });
        const interior = response.data.getOtherObject;
        console.log("useInteriorDetail... ", {interior});
        if (
            !interior ||
            interior.delete_flag == 1 ||
            interior.object_kind != OtherObjectKind.Interior
        ) {
            //not found
            router.replace("/404");
            return;
        }
        preSetInterior(interior);
        setInterior(interior);
        if (interior.field_list["thumnail"]) {
            setCoverImageUrl(interior.field_list["thumnail"]);
        }
        //end interior detail

        reloadHistory(interior, false);

        reloadDocument(interior, false);

        setLoading(false);
    }, [interiorId]);

    const preSetInterior = useCallback((interior) => {
        try {
            //parse field_list to get cover image with thumnail key
            const fieldList = interior.field_list
                ? JSON.parse(interior.field_list)
                : {};
            interior.field_list = fieldList;
        } catch (e) {
            console.error(e);
            interior.field_list = {};
        }
    }, []);

    const uploadInteriorCover = useCallback(
        async (file) => {
            setUploadCoverImage(true);
            try {
                const originFileName = `${file.name.replace(/ |　/g, "")}`;
                const s3FileNamePrefix = moment().format("YYYYMMDD_HHmmss");
                const s3FileName = getOtherObjectS3FileName(
                    interior,
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
                const fieldList = interior.field_list;
                fieldList["thumnail"] = urlPath;

                updateInteriorFieldList(fieldList, false, false);
            } catch (e) {
                console.error(e);
                toast.error(e.message);
            }
            setUploadCoverImage(false);
        },
        [interior]
    );

    const updateInteriorFieldList = useCallback(
        async (
            interiorFieldList,
            updateLoading = true,
            navigateToListInterior = true
        ) => {
            if (updateLoading) setLoading(true);
            try {
                const resOtherObject = await API.graphql({
                    query: mutations.updateOtherObject,
                    variables: {
                        input: {
                            id: interior.id,
                            field_list: JSON.stringify(interiorFieldList),
                        },
                    },
                });
                const updateInterior = resOtherObject.data.updateOtherObject;
                preSetInterior(updateInterior);
                setInterior(updateInterior);
                toast.success("物件情報を登録しました。");
                if (navigateToListInterior) {
                    router.push("/interior/list");
                }
            } catch (e) {
                console.error(e);
                throw e;
            }
            if (updateLoading) setLoading(false);
        },
        [interior]
    );

    useEffect(() => {
        if (isMounted() && interiorId) loadData();
    }, [isMounted, interiorId]);

    return {
        interior,
        coverImageUrl,
        histories,
        documents,
        deleteHistory,
        deleteDocument,
        loading,
        uploadCoverImage,
        loadData,
        reloadDocument,
        reloadHistory,
        uploadInteriorCover,
        updateInteriorFieldList,
    };
};
