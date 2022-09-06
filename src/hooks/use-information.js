import {API, Storage} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import * as queries from "graphql/queries";
import * as mutations from "graphql/mutations";
import {useMounted} from "./use-mounted";
import {useRouter} from "next/router";
import toast from "react-hot-toast";

export const useInformation = (informationId) => {
    const router = useRouter();
    const isMounted = useMounted();
    const [information, setInformation] = useState();
    const [loading, setLoading] = useState(false);

    const getAllInformationListSendByInformationId = useCallback(
        async (informationId, list = [], nextToken = null) => {
            const res = await API.graphql({
                query: queries.queryInformationListSendByInformationId,
                variables: {
                    information_id: informationId,
                    nextToken,
                },
            });
            list = list.concat(
                res.data.queryInformationListSendByInformationId.items
            );
            if (res.data.nextToken) {
                return getAllInformationListSendByInformationId(
                    informationId,
                    list,
                    res.data.nextToken
                );
            }
            return list;
        },
        []
    );

    const loadData = useCallback(async () => {
        setLoading(true);
        const response = await API.graphql({
            query: queries.getInformation,
            variables: {
                id: informationId,
            },
        });
        const information = response.data.getInformation;

        //get all list information send
        const informaionListSends =
            await getAllInformationListSendByInformationId(informationId);
        information.informaionListSends.items = informaionListSends;

        setInformation(information);
        setLoading(false);
    }, [informationId]);

    const updateInformation = useCallback(
        async ({id, subject, content, draftFlag, importantInfoFlag, date}) => {
            setLoading(true);
            try {
                await API.graphql({
                    query: mutations.updateInformation,
                    variables: {
                        input: {
                            id,
                            subject,
                            content,
                            draft_flag: draftFlag,
                            important_info_flag: importantInfoFlag,
                            scheduled_delivery_date: date,
                        },
                    },
                });
                router.push("/cs/information/list");
            } catch (e) {
                toast.error(e.message);
            }

            setLoading(false);
        },
        []
    );
    useEffect(() => {
        if (isMounted() && informationId) loadData();
    }, [isMounted, informationId]);

    return {
        loading,
        information,
        updateInformation,
    };
};
