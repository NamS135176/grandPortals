import {API} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {queryBukkensByUserIdWithCoverImage} from "../graphql/custom-queries";
import {useAuth} from "./use-auth";
import {useMounted} from "./use-mounted";
import * as R from "ramda";
import {getBukkenCoverImageUrlByBukken} from "../utils/bukken";

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
    }, []);

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            const bukkenList = await getListBukken();
            setBukkenList(bukkenList);
            //end load list bukken
            setLoading(false);
        }

        if (isMounted()) loadData();
    }, [isMounted]);

    return {bukkenList, loading};
};
