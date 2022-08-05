import {API} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {useMounted} from "./use-mounted";
import * as R from "ramda";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import {useDeleteDocument} from "./use-delete-document";
import {useDeleteHistory} from "./use-delete-history";
import { OtherObjectKind } from "../utils/bukken";

export const useInteriorList = (roomId) => {
    const isMounted = useMounted();
    const [interiors, setInteriors] = useState([]);
    const [loading, setLoading] = useState(false);
    const {deleteAllDocumentByOtherObjectId} = useDeleteDocument();
    const {deleteAllHistoryByOtherObjectId} = useDeleteHistory();

    const getListInterior = useCallback(
        async (list = [], nextToken = null, roomId) => {
            const response = await API.graphql({
                query: queries.queryOtherObjectByRoomId,
                variables: {
                    room_id: roomId,
                    nextToken,
                    filter: {
                        delete_flag: {
                            eq: 0,
                        },
                        object_kind: {
                            eq: OtherObjectKind.Interior,
                        },
                    },
                },
            });
            var interiors = response.data.queryOtherObjectByRoomId.items;
            if (!R.isNil(interiors) && !R.isEmpty(interiors)) {
                interiors.forEach((interior) => {
                    try {
                        //parse field_list to get cover image with thumnail key
                        const fieldList = interior.field_list
                            ? JSON.parse(interior.field_list)
                            : {};
                        interior.field_list = fieldList;
                    } catch (e) {
                        console.error(e);
                    }
                });
            }
            list = list.concat(interiors);
            if (response.data.queryOtherObjectByRoomId.nextToken) {
                await getListInterior(
                    list,
                    response.data.queryOtherObjectByRoomId.nextToken,
                    roomId
                );
            }
            return list;
        },
        []
    );

    const deleteInterior = useCallback(
        async (interior) => {
            try {
                await API.graphql({
                    query: mutations.updateOtherObject,
                    variables: {
                        input: {
                            id: interior.id,
                            delete_flag: 1,
                        },
                    },
                });
                const newInteriors = R.reject(R.propEq("id", interior.id))(
                    interiors
                );
                setInteriors(newInteriors);

                //update all documents + history related with this interior
                await deleteAllDocumentByOtherObjectId(interior.id);
                await deleteAllHistoryByOtherObjectId(interior.id);
            } catch (e) {
                console.error(e);
            }
        },
        [interiors]
    );

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const interiors = await getListInterior([], null, roomId);
            setInteriors(interiors);
            setLoading(false);
        }
        if (isMounted() && roomId) loadData();
    }, [isMounted, roomId]);

    return {interiors, deleteInterior, loading};
};
