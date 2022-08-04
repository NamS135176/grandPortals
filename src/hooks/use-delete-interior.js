import {API} from "aws-amplify";
import {useCallback} from "react";
import {queryOtherObjectOnlyByRoomId} from "../graphql/custom-queries";
import * as mutations from "../graphql/mutations";
import * as Throttle from "promise-parallel-throttle";
import * as R from "ramda";
import {useDeleteHistory} from "./use-delete-history";
import {useDeleteDocument} from "./use-delete-document";

export const useDeleteInterior = () => {
    const {deleteAllDocumentByOtherObjectId} = useDeleteDocument();
    const {deleteAllHistoryByOtherObjectId} = useDeleteHistory();

    const getInteriorsByRoomId = useCallback(
        async (roomId, list = [], nextToken = null) => {
            const res = await API.graphql({
                query: queryOtherObjectOnlyByRoomId,
                variables: {
                    room_id: roomId,
                    nextToken,
                    filter: {
                        delete_flag: {
                            eq: 0,
                        },
                    },
                },
            });
            const items = res.data.queryOtherObjectByRoomId.items;
            if (items?.length > 0) {
                list = list.concat(items);
            }
            const nxtToken = res.data.queryOtherObjectByRoomId.nextToken;
            if (nxtToken) {
                await getInteriorsByRoomId(otherObject, list, nxtToken); //load util nextToken is null
            }
            return list;
        },
        []
    );

    const deleteInterior = useCallback(async (interior) => {
        try {
            const res = await API.graphql({
                query: mutations.updateOtherObject,
                variables: {
                    input: {
                        id: interior.id,
                        delete_flag: 1,
                    },
                },
            });
            await deleteAllDocumentByOtherObjectId(interior.id);
            await deleteAllHistoryByOtherObjectId(interior.id);
            return res.data.updateInterior;
        } catch (e) {
            console.error(e);
        }
    }, []);

    const deleteAllInteriorByRoomId = useCallback(async (roomId) => {
        const interiors = await getInteriorsByRoomId(roomId);
        if (R.isNil(interiors) || R.isEmpty(interiors)) return;

        const queue = interiors.map((doc) => () => deleteInterior(doc));
        const results = await Throttle.all(queue);
        return results;
    }, []);

    return {
        deleteAllInteriorByRoomId,
    };
};
