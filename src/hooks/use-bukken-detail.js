import {API, Storage} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {
    listBukkens,
    listDocuments,
    listHistories,
    queryBukkensByBukkenNo,
} from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import {useMounted} from "./use-mounted";
import * as R from "ramda";

export const useBukkenDetail = (bukkenNo) => {
    const isMounted = useMounted();
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
        if (items?.length > 0) {
            setBukken(items[0]);
        }
        //end load list bukken

        reloadHistory(false);

        reloadDocument(false);

        setLoading(false);
    }, [bukkenNo]);

    useEffect(() => {
        if (isMounted && bukkenNo) loadData();
    }, [isMounted, bukkenNo]);

    return {
        bukken,
        histories,
        documents,
        deleteHistory,
        deleteDocument,
        loading,
        loadData,
        reloadDocument,
        reloadHistory,
    };
};
