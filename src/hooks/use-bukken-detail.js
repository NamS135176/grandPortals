import {API, Storage} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {
    queryBukkensByBukkenNo,
    queryOtherObjectByBukkenId,
    queryDocumentByBukkenId,
    queryHistoryByBukkenId,
} from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import {useMounted} from "./use-mounted";
import * as R from "ramda";
import {
    getBukkenCoverImageUrl,
    getOtherObjectS3FileName,
    getUrlPath,
    OtherObjectFieldKind,
    OtherObjectKind,
} from "../utils/bukken";
import moment from "moment";
import toast from 'react-hot-toast';
import {getNextOtherObjectId} from "../utils/id-generator";
import { useRouter } from "next/router";
import { resizeImage } from "../utils/image";

export const useBukkenDetail = (bukkenNo) => {
    const router = useRouter();
    const isMounted = useMounted();
    const [coverImageUrl, setCoverImageUrl] = useState();
    const [bukkenOtherObject, setBukkenOtherObject] = useState();
    const [bukken, setBukken] = useState();
    const [histories, setHistories] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadCoverImage, setUploadCoverImage] = useState(false)

    const deleteHistory = useCallback(
        async (history) => {
            try {
                await API.graphql({
                    query: mutations.updateHistory,
                    variables: {
                        input: {
                            id: history.id,
                            delete_flag: 1
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
                            delete_flag: 1
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
        async (bukken, list = [], nextToken = null) => {
            if (!bukken) return;
            const res = await API.graphql({
                query: queryDocumentByBukkenId,
                variables: {
                    bukken_id: bukken.id,
                    nextToken,
                    filter:{
                        delete_flag:{
                            eq: 0
                        }
                    }
                },
            });
            const items = res.data.queryDocumentByBukkenId.items;
            if (items?.length > 0) {
                list = list.concat(items);
            }
            const nxtToken = res.data.queryDocumentByBukkenId.nextToken;
            if (nxtToken) {
                await getListDocument(bukken, list, nxtToken); //load util nextToken is null
            }
            return list;
        },
        []
    );

    const getListHistory = useCallback(
        async (bukken, list = [], nextToken = null) => {
            if (!bukken) return;
            const res = await API.graphql({
                query: queryHistoryByBukkenId,
                variables: {
                    bukken_id: bukken.id,
                    nextToken,
                    filter:{
                        delete_flag:{
                            eq: 0
                        }
                    }
                },
            });
            const items = res.data.queryHistoryByBukkenId.items;
            if (items?.length > 0) {
                list = list.concat(items);
            }
            const nxtToken = res.data.queryHistoryByBukkenId.nextToken;
            if (nxtToken) {
                await getListHistory(bukken, list, nxtToken); //load util nextToken is null
            }
            return list;
        },
        []
    );

    const reloadDocument = useCallback(
        async (bukken, updateLoading = true) => {
            if (updateLoading) setLoading(true);
            const documents = await getListDocument(bukken);
            if (documents?.length > 0) {
                setDocuments(documents);
            }
            if (updateLoading) setLoading(false);
        },
        []
    );

    const reloadHistory = useCallback(
        async (bukken, updateLoading = true) => {
            if (updateLoading) setLoading(true);
            const histories = await getListHistory(bukken);
            console.log("reloadHistory.... ", { histories })
            if (histories?.length > 0) {
                setHistories(histories);
            }
            if (updateLoading) setLoading(false);
        },
        []
    );

    const updateBukken = useCallback(
        async (remarks) => {
            const res = await API.graphql({
                query: mutations.updateBukken,
                variables: {
                    input: {
                        id: bukken.id,
                        remarks: remarks
                    }
                },
            });
            toast.success("物件情報を登録しました。")
            router.push('/bukken/list')
        }
       
    )

    const loadData = useCallback(async () => {
        setLoading(true);

        //load bukken detail
        const response = await API.graphql({
            query: queryBukkensByBukkenNo,
            variables: {
                bukken_no: bukkenNo,
            },
        });
        const {items} = response.data.queryBukkensByBukkenNo;
        const bukken = items?.length > 0 ? items[0] : null;
        if (!bukken) {
            //not found
            router.replace("/404")
            return
        }
        setBukken(bukken);
        //end load list bukken

        reloadHistory(bukken, false);

        reloadDocument(bukken, false);

        getBukkenOtherObject(bukken);

        setLoading(false);
    }, [bukkenNo]);

    const getBukkenOtherObject = useCallback(async (bukken) => {
        if (!bukken) return;

        const res = await API.graphql({
            query: queryOtherObjectByBukkenId,
            variables: {
                bukken_id: bukken.id,
                limit: 1000,
                filter: {object_kind: {eq: OtherObjectKind.Bukken}},
            },
        });
        const items = res.data.queryOtherObjectByBukkenId.items;
        if (items?.length > 0) {
            const otherObject = items[0];
            setBukkenOtherObject(otherObject);
            const coverImageUrl = getBukkenCoverImageUrl(otherObject);
            if (coverImageUrl) {
                setCoverImageUrl(coverImageUrl);
            }
        }
    }, []);

    const uploadBukenCover = useCallback(
        async (file) => {
            setUploadCoverImage(true)
            try {
                //create other object if not exist firstly cause image cover will be save on bukkenOtherObject
                // if (coverImageUrl) {
                //     const res = await Storage.remove(getS3FromUrl(coverImageUrl), {level: "public"});   
                // }

                var tmpBukkenOtherObject = bukkenOtherObject;
                if (!tmpBukkenOtherObject) {
                    const otherObjectId = await getNextOtherObjectId();
                    const resOtherObject = await API.graphql({
                        query: mutations.createOtherObject,
                        variables: {
                            input: {
                                id: otherObjectId,
                                bukken_id: bukken.id,
                                // bukken_no: bukken.bukken_no,
                                user_id: bukken.user_id,
                                object_kind: OtherObjectKind.Bukken,
                                field_kind:
                                    OtherObjectFieldKind.ReadyMadeProduct, //dont use that one
                                field_list: {},
                                delete_flag: 0,
                                sort: 1, //always 1
                                object_kind_updatedAt: `${
                                    OtherObjectKind.Bukken
                                }#${moment() //0#20221201T102309
                                    .utc()
                                    .format("YYYYMMDDTHHmmss")}`,
                            },
                        },
                    });
                    tmpBukkenOtherObject =
                        resOtherObject.data.createOtherObject;
                }
                //upload file
                const originFileName = `${file.name.replace(/ |　/g, "")}`;
                const s3FileNamePrefix = moment().format("YYYYMMDD_HHmmss");
                const s3FileName = getOtherObjectS3FileName(
                    tmpBukkenOtherObject,
                    `${s3FileNamePrefix}_${originFileName}`
                );

                //resize image first
                file = await resizeImage(file, 1280, 85);

                // const s3FileName = getOtherObjectS3FileName(bukken);
                const res = await Storage.put(s3FileName, file, {
                    level: "public",
                    contentType: file.type,
                });
                const urlPath = getUrlPath(s3FileName);

                setCoverImageUrl(urlPath);

                console.log({tmpBukkenOtherObject});

                //update other object for update field_list
                const fieldList = tmpBukkenOtherObject.field_list
                    ? JSON.parse(tmpBukkenOtherObject.field_list)
                    : {};
                fieldList["thumnail"] = urlPath;

                const resOtherObject = await API.graphql({
                    query: mutations.updateOtherObject,
                    variables: {
                        input: {
                            id: tmpBukkenOtherObject.id,
                            field_list: JSON.stringify(fieldList),
                        },
                    },
                });
                setBukkenOtherObject(resOtherObject.data.updateOtherObject);
            } catch (e) {
                console.error(e);
                toast.error(e.message)
            }
            setUploadCoverImage(false)
        },
        [bukken, bukkenOtherObject]
    );

    useEffect(() => {
        if (isMounted && bukkenNo) loadData();
    }, [isMounted, bukkenNo]);

    return {
        bukken,
        coverImageUrl,
        histories,
        documents,
        deleteHistory,
        deleteDocument,
        loading,
        loadData,
        reloadDocument,
        reloadHistory,
        uploadBukenCover,
        updateBukken,
        loading,
        uploadCoverImage,
    };
};
