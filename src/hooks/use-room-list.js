import {API} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {useAuth} from "./use-auth";
import {useMounted} from "./use-mounted";
import * as R from "ramda";
import {listOtherObjects} from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import {OtherObjectKind} from "../utils/bukken";

export const useRoomList = () => {
    const {user} = useAuth();
    const isMounted = useMounted();
    const [roomList, setRoomList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getListRoom = useCallback(async (list = [], nextToken = null) => {
        const response = await API.graphql({
            query: listOtherObjects,
            variables: {
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
        var rooms = response.data.listOtherObjects.items;
        if (!R.isNil(rooms) && !R.isEmpty(rooms)) {
            rooms.forEach((room) => {
                try {
                    //parse field_list to get cover image with thumnail key
                    const fieldList = room.field_list
                        ? JSON.parse(room.field_list)
                        : {};
                    room.field_list = fieldList;
                    if (fieldList && fieldList["thumnail"]) {
                        room.image = fieldList["thumnail"];
                    }
                    if (fieldList && fieldList["type"]) {
                        room.type = fieldList["type"];
                    }
                    if (fieldList && fieldList["name"]) {
                        room.name = fieldList["name"];
                    }
                } catch (e) {
                    console.error(e);
                }
            });
        }
        list = list.concat(rooms);
        if (response.data.listOtherObjects.nextToken) {
            await getListRoom(list, response.data.listOtherObjects.nextToken);
        }
        return list;
    }, []);

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

                //delete s3 also
            } catch (e) {
                console.error(e);
            }
        },
        [roomList]
    );

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            const rooms = await getListRoom();
            setRoomList(rooms);
            //end load list bukken
            setLoading(false);
        }

        if (isMounted) loadData();
    }, [isMounted]);

    return {roomList, deleteRoom, loading};
};
