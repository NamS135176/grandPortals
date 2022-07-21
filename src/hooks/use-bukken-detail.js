import {API, Storage} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {
    listDocuments,
    listHistories,
    queryBukkensByBukkenNo,
    queryOtherObjectByBukkenId,
} from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import {useMounted} from "./use-mounted";
import * as R from "ramda";
import {
    getBukenCoverImageS3Path,
    getOtherObjectS3FileName,
    getUrlPath,
    OtherObjectFieldKind,
    OtherObjectKind,
} from "../utils/bukken";
import moment from "moment";
import {getNextDocumentId, getNextOtherObjectId} from "../utils/id-generator";

export const useBukkenDetail = (bukkenNo) => {
    const isMounted = useMounted();
    const [coverImageUrl, setCoverImageUrl] = useState();
    const [bukenOtherObject, setBukenOtherObject] = useState();
    const [bukken, setBukken] = useState();
    const [histories, setHistories] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    const deleteHistory = useCallback(
        async (history) => {
            try {
                await API.graphql({
                    query: mutations.deleteHistory,
                    variables: {
                        input: {
                            id: history.id,
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
                    query: mutations.deleteDocument,
                    variables: {
                        input: {
                            id: document.id,
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

    const reloadDocument = useCallback(
        async (updateLoading = true) => {
            if (updateLoading) setLoading(true);
            const resDocument = await API.graphql({
                query: listDocuments,
                // variables: {
                //     bukken_no: bukkenNo,
                // },
            });
            const documents = resDocument.data.listDocuments.items;
            if (documents?.length > 0) {
                setDocuments(documents);
            }
            //end load document list
            if (updateLoading) setLoading(false);
        },
        [bukkenNo]
    );

    const reloadHistory = useCallback(
        async (updateLoading = true) => {
            if (updateLoading) setLoading(true);
            const resHistory = await API.graphql({
                query: listHistories,
                // variables: {
                //     bukken_no: bukkenNo,
                // },
            });
            const histories = resHistory.data.listHistories.items;
            if (histories?.length > 0) {
                setHistories(histories);
            }
            if (updateLoading) setLoading(false);
        },
        [bukkenNo]
    );

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
        setBukken(bukken);
        //end load list bukken

        reloadHistory(false);

        reloadDocument(false);

        getBukenOtherObject(bukken);

        setLoading(false);
    }, [bukkenNo]);

    const getBukenOtherObject = useCallback(async (bukken) => {
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
            setBukenOtherObject(otherObject);
            try {
                //parse field_list to get cover image with thumnail key
                const fieldList = otherObject.field_list
                    ? JSON.parse(otherObject.field_list)
                    : null;
                if (fieldList && fieldList["thumnail"]) {
                    setCoverImageUrl(fieldList["thumnail"]);
                }
            } catch (e) {
                console.log(e)
                throw e;
            }
        }
    }, []);

    const uploadBukenCover = useCallback(
        async (file) => {
            try {
                //create other object if not exist firstly cause image cover will be save on bukenOtherObject
                var tmpBukkenOtherObject = bukenOtherObject;
                if (!tmpBukkenOtherObject) {
                    const otherObjectId = await getNextOtherObjectId();
                    const resOtherObject = await API.graphql({
                        query: mutations.createOtherObject,
                        variables: {
                            input: {
                                id: otherObjectId,
                                bukken_id: bukken.id,
                                // bukkenOtherObjectsId: bukken.id,
                                bukken_no: bukken.bukken_no,
                                user_id: bukken.user_id,
                                object_kind: OtherObjectKind.Bukken,
                                field_kind:
                                    OtherObjectFieldKind.ReadyMadeProduct, //dont use that one
                                field_list: {
                                    // thumnail: ""
                                },
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
                    console.log({resOtherObject});
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

                // const s3FileName = getOtherObjectS3FileName(bukken);
                const res = await Storage.put(s3FileName, file, {
                    level: "public",
                    contentType: file.type,
                });
                const urlPath = getUrlPath(s3FileName);

                console.log("uploadBukenCover...", {
                    res,
                    s3FileName,
                    urlPath,
                });

                setCoverImageUrl(urlPath);

                console.log({tmpBukkenOtherObject})

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
                setBukenOtherObject(resOtherObject.data.updateOtherObject);
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        [bukken, bukenOtherObject]
    );

    useEffect(() => {
        if (isMounted && bukkenNo) loadData();
    }, [isMounted, bukkenNo]);

    console.log("useBukkenDetail... ", {
        bukken,
        coverImageUrl,
        histories,
        documents,
    });

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
    };
};
