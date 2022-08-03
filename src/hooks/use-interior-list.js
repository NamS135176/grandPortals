import {API} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {useMounted} from "./use-mounted";
import * as R from "ramda";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

export const useInteriorList = (roomId) => {
    const isMounted = useMounted();
    const [interiors, setInteriors] = useState([]);
    const [loading, setLoading] = useState(false);

    const getListInterior = useCallback(
        async (list = [], nextToken = null, roomId) => {
            const response = await API.graphql({
                query: queries.queryOtherObjectByRoomId,
                nextToken: nextToken,
                variables: {
                    room_id: roomId,
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
        if (isMounted && roomId) loadData();
    }, [isMounted, roomId]);

    return {interiors, deleteInterior, loading};
};
