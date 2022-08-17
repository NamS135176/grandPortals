import {API} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {useMounted} from "./use-mounted";
import * as R from "ramda";
import * as mutations from "../graphql/mutations";
import {OtherObjectKind} from "../utils/bukken";
import {useDeleteDocument} from "./use-delete-document";
import {useDeleteHistory} from "./use-delete-history";
import {useDeleteInterior} from "./use-delete-interior";
import {queryOtherObjectOnlyByBukkenId} from "graphql/custom-queries";

export const useRoomList = (bukkenId) => {
    const isMounted = useMounted();
    const [roomList, setRoomList] = useState([]);
    const [loading, setLoading] = useState(false);
    const {deleteAllDocumentByOtherObjectId} = useDeleteDocument();
    const {deleteAllHistoryByOtherObjectId} = useDeleteHistory();
    const {deleteAllInteriorByRoomId} = useDeleteInterior();

    const getListRoom = useCallback(
        async (list = [], nextToken = null, bukkenId) => {
            const response = await API.graphql({
                query: queryOtherObjectOnlyByBukkenId,
                variables: {
                    nextToken: nextToken,
                    bukken_id: bukkenId,
                    filter: {
                        object_kind: {
                            eq: OtherObjectKind.RoomSpace,
                        },
                        delete_flag: {
                            eq: 0,
                        },
                    },
                },
            });
            var rooms = response.data.queryOtherObjectByBukkenId.items;
            if (!R.isNil(rooms) && !R.isEmpty(rooms)) {
                rooms.forEach((room) => {
                    try {
                        //parse field_list to get cover image with thumnail key
                        const fieldList = room.field_list
                            ? JSON.parse(room.field_list)
                            : {};
                        room.field_list = fieldList;
                    } catch (e) {
                        console.error(e);
                    }
                });
            }
            list = list.concat(rooms);
            if (response.data.queryOtherObjectByBukkenId.nextToken) {
                await getListRoom(
                    list,
                    response.data.queryOtherObjectByBukkenId.nextToken,
                    bukkenId
                );
            }
            return list;
        },
        [bukkenId]
    );

    const deleteRoom = useCallback(
        async (room) => {
            try {
                await API.graphql({
                    query: mutations.updateOtherObject,
                    variables: {
                        input: {
                            id: room.id,
                            delete_flag: 1,
                        },
                    },
                });
                const newDocuments = R.reject(R.propEq("id", room.id))(
                    roomList
                );
                setRoomList(newDocuments);

                //update all documents + history related with this interior
                await deleteAllDocumentByOtherObjectId(room.id);
                await deleteAllHistoryByOtherObjectId(room.id);
                await deleteAllInteriorByRoomId(room.id);

                const activeRoomId = sessionStorage.getItem("room_id");
                if (activeRoomId == room.id) {
                    // sessionStorage.removeItem("room_id");
                }
            } catch (e) {
                console.error(e);
            }
        },
        [roomList]
    );

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            const rooms = await getListRoom([], null, bukkenId);
            setRoomList(rooms);
            //end load list bukken
            setLoading(false);
        }

        if (isMounted() && bukkenId) loadData();
    }, [isMounted, bukkenId]);

    return {roomList, deleteRoom, loading};
};
