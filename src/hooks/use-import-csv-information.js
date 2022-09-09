import {API, Storage} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import * as R from "ramda";
import * as Throttle from "promise-parallel-throttle";
import * as mutations from "graphql/mutations";
import * as queries from "graphql/queries";
import toast from "react-hot-toast";
import {
    getNextInformationId,
    getNextInformationListSendId,
} from "utils/id-generator";

export const useImportCSVInformation = () => {
    const [loading, setLoading] = useState(false);

    const findUserByEmail = useCallback(async (email) => {
        const res = await API.graphql({
            query: queries.queryUserByEmail,
            variables: {
                email,
            },
        });
        const items = res.data.queryUserByEmail.items;
        return !R.isEmpty(items) ? items[0] : null;
    }, []);

    const createInformationListSend = useCallback(
        async (informationId, email) => {
            const user = await findUserByEmail(email);
            if (!user)
                return {
                    isError: true,
                    message: `${email}メールアドレスが存在しません。`,
                };
            const id = await getNextInformationListSendId();
            console.log("createInformationListSend...", {user, id});
            // create information table
            const res = await API.graphql({
                query: mutations.createInformationListSend,
                variables: {
                    input: {
                        id,
                        information_id: informationId,
                        user_id: user.id,
                        name: user.name,
                        name_kana: user.name_kana,
                        email: user.email,
                        withdrawal_flag: user.delete_flag ?? false,
                        receive_notification_email_flag:
                            user.receive_notification_email_flag ?? true,
                        sort: 1, //always 1
                    },
                },
            });
            const item = res.data.createInformationListSend;
            return item;
        },
        []
    );

    const createInformation = useCallback(
        async ({
            subject = null,
            content = null,
            important_info_flag = 0,
            draft_flag = 0,
            scheduled_delivery_date = null,
            data = null,
        }) => {
            //data is array list of { email: "email" }
            var results = [];
            var information = null;
            setLoading(true);
            try {
                const id = await getNextInformationId();
                // create information table
                const res = await API.graphql({
                    query: mutations.createInformation,
                    variables: {
                        input: {
                            id,
                            subject,
                            content,
                            draft_flag,
                            delete_flag: 0,
                            important_info_flag,
                            scheduled_delivery_date,
                            sort: 1, //always 1
                        },
                    },
                });
                information = res.data.createInformation;

                if (!R.isNil(data) && !R.isEmpty(data)) {
                    const queue = data.map(
                        ({email}) =>
                            () =>
                                createInformationListSend(information.id, email)
                    );
                    const allRes = await Throttle.all(queue, {
                        maxInProgress: 1,
                    });
                    const errors = [];
                    //filter errors
                    allRes.forEach((item) => {
                        if (item.isError) errors.push(item);
                        else results.push(item);
                    });
                    console.log("updateInformation... results: ", results);
                    if (!R.isEmpty(errors)) {
                        toast.error(
                            errors.map((error) => error.message).join("\n")
                        );
                    }
                }
            } catch (e) {
                toast.error(e.message);
                console.error(e);
                // throw e;
            }
            setLoading(false);
            return {information, data: results};
        },
        []
    );

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

    const deleteInformationListSend = useCallback(async (id) => {
        await API.graphql({
            query: mutations.deleteInformationListSend,
            variables: {
                input: {
                    id,
                },
            },
        });
    }, []);

    const deleteAllInformationListSendByInformationId = useCallback(
        async (informationId) => {
            //delete infomationListSend
            const listInfomationListSend =
                await getAllInformationListSendByInformationId(informationId);
            if (
                R.isNil(listInfomationListSend) ||
                R.isEmpty(listInfomationListSend)
            )
                return;
            // const queueDeleteInformationListSend =
            const queue = listInfomationListSend.map(
                (item) => () => deleteInformationListSend(item.id)
            );
            await Throttle.all(queue, {maxInProgress: 10});
        },
        []
    );

    const updateInformationListSend = useCallback(
        async ({informationId, data}) => {
            //data is array list of { email: "email" }
            var results = [];
            setLoading(true);
            try {
                console.log("updateInformationListSend... ", {
                    informationId,
                    data,
                });
                //delete infomationListSend
                await deleteAllInformationListSendByInformationId(
                    informationId
                );
                // const queueDeleteInformationListSend =
                const queue = data.map(
                    ({email}) =>
                        () =>
                            createInformationListSend(informationId, email)
                );
                const allRes = await Throttle.all(queue, {maxInProgress: 1});
                const errors = [];
                //filter errors
                allRes.forEach((item) => {
                    if (item.isError) errors.push(item);
                    else results.push(item);
                });
                console.log("updateInformation... results: ", results);
                if (!R.isEmpty(errors)) {
                    toast.error(
                        errors.map((error) => error.message).join("\n")
                    );
                }
            } catch (e) {
                toast.error(e.message);
                console.error(e);
                // throw e;
            }
            setLoading(false);
            return results;
        },
        []
    );

    return {
        createInformation,
        updateInformationListSend,
        loading,
    };
};
