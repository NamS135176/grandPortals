import {API} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {queryBukkensByUserId} from "../graphql/queries";
import {useMounted} from "./use-mounted";
import {useAuth} from "./use-auth";
import {useRouter} from "next/router";

export const useBukkenDefault = () => {
    const {user} = useAuth();
    const router = useRouter();
    const isMounted = useMounted();
    const [bukken, setBukken] = useState();

    const loadData = useCallback(async () => {
        //load bukken detail
        const response = await API.graphql({
            query: queryBukkensByUserId,
            variables: {
                user_id: user.id,
            },
        });
        const {items} = response.data.queryBukkensByUserId;
        const bukken = items?.length > 0 ? items[0] : null;
        if (!bukken) {
            //not found
            router.replace("/bukken/list");
            return;
        }
        setBukken(bukken);
    }, [user]);

    useEffect(() => {
        if (isMounted && user) loadData();
    }, [isMounted, user]);

    return {
        bukken,
    };
};
