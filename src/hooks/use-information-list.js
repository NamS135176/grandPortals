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
import { listInformation, queryInformationListSendByUserId } from "graphql/queries";

export const useInformationList = () => {
    const {user} = useAuth();
    const isMounted = useMounted();
    const [informationList, setInformationList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getListInformationSendList = useCallback(async (list = [], nextToken = null) => {
        const response = await API.graphql({
            query: queryInformationListSendByUserId,
            variables: {
                user_id: user.id,
                nextToken,
            },
        });
        var informationSendList = response.data.queryInformationListSendByUserId.items;
        list = list.concat(informationSendList);
        if (response.data.queryInformationListSendByUserId.nextToken) {
            await getListInformationSendList(
                list,
                response.data.queryInformationListSendByUserId.nextToken
            );
        }
        return list;
    }, [user]);

    const getListCSInformationSendList = useCallback(
        async (list = [], nextToken = null) => {
            const response = await API.graphql({
                query: listInformation,
                variables: {
                    nextToken,
                },
            });
            var informationList = response.data.listInformation.items;
            list = list.concat(informationList);
            if (response.data.listInformation.nextToken) {
                await getListCSInformationSendList(
                    list,
                    response.data.listInformation.nextToken
                );
            }
            return list;
        },
        []
    );

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            let informationList = null;
            if (user.group === UserGroup.agentGrands) {
                informationList = await getListInformationSendList();
            } else {
                informationList = await getListCSInformationSendList();
            }
            console.log(informationList);
            setInformationList(informationList);
            //end load list bukken
            setLoading(false);
        }

        if (isMounted() && user) loadData();
    }, [isMounted, user]);

    return {informationList, loading};
};
