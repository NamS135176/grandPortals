import {API} from "aws-amplify";
import {useCallback} from "react";
import {queryHistoryOnlyByOtherObjectId} from "../graphql/custom-queries";
import {queryHistoryByOtherObjectId} from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as Throttle from "promise-parallel-throttle";
import * as R from "ramda";

export const useDeleteHistory = () => {
    const getHistorysByOtherObjectId = useCallback(
        async (
            otherObjectId,
            includeBukken = false,
            list = [],
            nextToken = null
        ) => {
            const res = await API.graphql({
                query: includeBukken
                    ? queryHistoryByOtherObjectId
                    : queryHistoryOnlyByOtherObjectId,
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
            const items = res.data.queryHistoryByOtherObjectId.items;
            if (items?.length > 0) {
                list = list.concat(items);
            }
            const nxtToken = res.data.queryHistoryByOtherObjectId.nextToken;
            if (nxtToken) {
                await getHistorysByOtherObjectId(otherObject, list, nxtToken); //load util nextToken is null
            }
            return list;
        },
        []
    );

    const deleteHistory = useCallback(async (history) => {
        try {
            const res = await API.graphql({
                query: mutations.updateHistory,
                variables: {
                    input: {
                        id: history.id,
                        delete_flag: 1,
                    },
                },
            });
            return res.data.updateHistory;
        } catch (e) {
            console.error(e);
        }
    }, []);

    const deleteAllHistoryByOtherObjectId = useCallback(
        async (otherObjectId) => {
            const historys = await getHistorysByOtherObjectId(otherObjectId);
            if (R.isNil(historys) || R.isEmpty(historys)) return;

            const queue = historys.map((doc) => () => deleteHistory(doc));
            const results = await Throttle.all(queue);
            return results;
        },
        []
    );

    return {
        getHistorysByOtherObjectId,
        deleteHistory,
        deleteAllHistoryByOtherObjectId,
    };
};
