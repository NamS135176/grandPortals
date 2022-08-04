import {API} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {queryDocumentOnlyByOtherObjectId} from "../graphql/custom-queries";
import {queryDocumentByOtherObjectId} from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as Throttle from "promise-parallel-throttle";
import * as R from "ramda";

export const useDocument = () => {
    const getDocumentsByOtherObjectId = useCallback(
        async (
            otherObjectId,
            includeBukken = false,
            list = [],
            nextToken = null
        ) => {
            const res = await API.graphql({
                query: includeBukken
                    ? queryDocumentByOtherObjectId
                    : queryDocumentOnlyByOtherObjectId,
                variables: {
                    other_object_id: otherObjectId,
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
                await getDocumentsByOtherObjectId(otherObject, list, nxtToken); //load util nextToken is null
            }
            return list;
        },
        []
    );

    const deleteDocument = useCallback(async (document) => {
        try {
            const res = await API.graphql({
                query: mutations.updateDocument,
                variables: {
                    input: {
                        id: document.id,
                        delete_flag: 1,
                    },
                },
            });
            return res.data.updateDocument;
        } catch (e) {
            console.error(e);
        }
    }, []);

    const deleteAllDocumentByOtherObjectId = useCallback(
        async (otherObjectId) => {
            const documents = await getDocumentsByOtherObjectId(otherObjectId);
            if (R.isNil(documents) || R.isEmpty(documents)) return;

            const queue = documents.map((doc) => () => deleteDocument(doc));
            const results = await Throttle.all(queue);
            return results;
        },
        []
    );

    return {
        getDocumentsByOtherObjectId,
        deleteDocument,
        deleteAllDocumentByOtherObjectId,
    };
};
