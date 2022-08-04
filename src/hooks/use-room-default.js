import {API} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {useMounted} from "./use-mounted";
import {useAuth} from "./use-auth";
import {useRouter} from "next/router";
import { getOtherObjectOnly } from "../graphql/custom-queries";

export const useRoomDefault = () => {
    const {user} = useAuth();
    const router = useRouter();
    const isMounted = useMounted();
    const [room, setRoom] = useState();

    const loadData = useCallback(async () => {
        var activeRoom = null;
        const activeRoomId = sessionStorage.getItem("room_id");
        if (activeRoomId) {
            const response = await API.graphql({
                query: getOtherObjectOnly,
                variables: {
                    id: activeRoomId,
                },
            });
            activeRoom = response.data.getOtherObject;
        }
        if (!activeRoom) {
            //not found
            router.replace("/room/list");
            return;
        }
        setRoom(activeRoom);
    }, [user]);

    useEffect(() => {
        if (isMounted && user) loadData();
    }, [isMounted, user]);

    return {
        room,
    };
};
