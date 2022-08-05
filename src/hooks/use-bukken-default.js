import {API} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {queryBukkensByUserId} from "../graphql/queries";
import {useMounted} from "./use-mounted";
import {useAuth} from "./use-auth";
import {useRouter} from "next/router";
import { getBukkenOnly } from "../graphql/custom-queries";

export const useBukkenDefault = () => {
    const {user} = useAuth();
    const router = useRouter();
    const isMounted = useMounted();
    const [bukken, setBukken] = useState();
    

    const loadData = useCallback(async () => {
        var activeBukken = null;
        const activeBukkenId = sessionStorage.getItem("bukken_id");
        if (activeBukkenId) {
            const response = await API.graphql({
                query: getBukkenOnly,
                variables: {
                    id: activeBukkenId,
                },
            });
            activeBukken = response.data.getBukken;
        }
        if (!activeBukken) {
            //load first bukken on list
            const response = await API.graphql({
                query: queryBukkensByUserId,
                variables: {
                    user_id: user.id,
                },
            });
            const {items} = response.data.queryBukkensByUserId;
            activeBukken = items?.length > 0 ? items[0] : null;
            if (activeBukken) {
                //save bukken_id to storage
                sessionStorage.setItem("bukken_id", activeBukken.id);
            }
        }
        if (!activeBukken) {
            //not found
            router.replace("/bukken/list");
            return;
        }
        setBukken(activeBukken);
    }, [user]);

    useEffect(() => {
        if (isMounted() && user) loadData();
    }, [isMounted, user]);

    return {
        bukken,
    };
};
