import {API} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {
    listBukkensWithCoverImage,
    queryBukkensByUserIdWithCoverImage,
} from "../graphql/custom-queries";
import {useAuth} from "./use-auth";
import {useMounted} from "./use-mounted";
import * as R from "ramda";
import {getBukkenCoverImageUrlByBukken} from "../utils/bukken";
import {UserGroup} from "../utils/global-data";

export const useBukkenList = () => {
    const {user} = useAuth();
    const isMounted = useMounted();
    const [bukkenList, setBukkenList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getListBukken = useCallback(async (list = [], nextToken = null) => {
        const response = await API.graphql({
            query: queryBukkensByUserIdWithCoverImage,
            variables: {
                user_id: user.id,
                nextToken,
            },
        });
        var bukkenList = response.data.queryBukkensByUserId.items;
        if (!R.isNil(bukkenList) && !R.isEmpty(bukkenList)) {
            bukkenList.forEach((buk) => {
                buk.image = getBukkenCoverImageUrlByBukken(buk);
            });
        }
        list = list.concat(bukkenList);
        if (response.data.queryBukkensByUserId.nextToken) {
            await getListBukken(
                list,
                response.data.queryBukkensByUserId.nextToken
            );
        }
        return list;
    }, [user]);

    const getListBukkenForCS = useCallback(
        async (list = [], nextToken = null) => {
            const response = await API.graphql({
                query: listBukkensWithCoverImage,
                variables: {
                    nextToken,
                },
            });
            var bukkenList = response.data.listBukkens.items;
            if (!R.isNil(bukkenList) && !R.isEmpty(bukkenList)) {
                bukkenList.forEach((buk) => {
                    buk.image = getBukkenCoverImageUrlByBukken(buk);
                });
            }
            list = list.concat(bukkenList);
            if (response.data.listBukkens.nextToken) {
                await getListBukkenForCS(
                    list,
                    response.data.listBukkens.nextToken
                );
            }
            return list;
        },
        []
    );

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            var bukkenList = null;
            if (user.group === UserGroup.agentGrands) {
                bukkenList = await getListBukken();
            } else {
                bukkenList = await getListBukkenForCS();
            }
            setBukkenList(bukkenList);
            //end load list bukken
            setLoading(false);
        }

        if (isMounted() && user) loadData();
    }, [isMounted, user]);

    return {bukkenList, loading};
};
