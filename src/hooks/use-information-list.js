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
import moment from "moment";
import { listInformation, queryInformationListSendByUserId , queryInformationListSendByInformationId, getInformation} from "graphql/queries";
import * as mutations from "../graphql/mutations";
import toast from "react-hot-toast";

export const useInformationList = () => {
    const {user} = useAuth();
    const isMounted = useMounted();
    const [informationList, setInformationList] = useState([]);
    const [informationListFirst, setInformationListFirst] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);

    const getListInformationSendList = useCallback(async (list = [], nextToken = null) => {
        const response = await API.graphql({
            query: queryInformationListSendByUserId,
            variables: {
                user_id: user.id,
                nextToken,
                filter: {
                    delete_flag: {
                        eq: 0,
                    },
                },
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
                    filter: {
                        delete_flag: {
                            eq: 0,
                        },
                    },
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

    const getListInformationSendByInformationId = useCallback(
        async (list = [], nextToken = null, id) => {
            const response = await API.graphql({
                query: queryInformationListSendByInformationId,
                variables: {
                    nextToken,
                    information_id:  id
                },
            });
            var informationListSend = response.data.queryInformationListSendByInformationId.items;
            list = list.concat(informationListSend);
            if (response.data.queryInformationListSendByInformationId.nextToken) {
                await getListInformationSendByInformationId(
                    list,
                    response.data.queryInformationListSendByInformationId.nextToken,
                    id
                );
            }
            return list;
        },
        []
    );

    const filterInformationSendList = useCallback(
         (filter) => {
          if(filter == "全て"){
            setInformationList(informationListFirst)
          }
          else{
            const newList = informationListFirst.filter(item => {
                return item.status == filter
            })
            console.log("newList", newList);
            setInformationList(newList)
          }
        },
        []
    )

    let filterDateInformationSendList =  (start, end, filter) => {
        setPage(0)
            if(filter == "全て" ){
                if(!start || !end){
                    console.log("ok");
                    setInformationList(informationListFirst)
                }
                else{
                    const newList = informationListFirst.filter(item => {
                        return moment(item.scheduled_delivery_date).valueOf()
                         < end.getTime() && moment(item.scheduled_delivery_date).valueOf()
                         > start.getTime()
                    })
                    console.log("newList", newList);
                    setInformationList(newList)
                }
            }
            else{
                if(!start || !end){
                    const newList = informationListFirst.filter(item => {
                        return item.status == filter
                    })
                    console.log("newList", newList);
                    setInformationList(newList)
                }
                else{
                    const newList = informationListFirst.filter(item => {
                        return moment(item.scheduled_delivery_date).valueOf()
                         < end.getTime() && moment(item.scheduled_delivery_date).valueOf()
                         > start.getTime() && item.status == filter
                    })
                    console.log("newList", newList);
                    setInformationList(newList)
                }
            }
          
       }

       const deleteInformation = useCallback(
        async (item) => {
            try {
                const info =  await API.graphql({
                    query: getInformation,
                    variables: {
                      id: item.id
                    },
                });
                // console.log(info);
                if(info.data?.getInformation?.delete_flag == 0){
                await API.graphql({
                    query: mutations.updateInformation,
                    variables: {
                        input: {
                            id: item.id,
                            delete_flag: 1,
                        },
                    },
                });
                const listDelete = await getListInformationSendByInformationId([],null,item.id)
                const res = await Promise.all(listDelete.map(item => {
                    return API.graphql({
                        query: mutations.updateInformationListSend,
                        variables: {
                            input: {
                                id: item.id,
                                delete_flag: 1,
                            },
                        },
                    });
                }))
                const newInformationList = R.reject(R.propEq("id", item.id))(
                    informationList
                );
                setInformationList(newInformationList);
                const newInformationListFirst = R.reject(R.propEq("id", item.id))(
                    informationListFirst
                );
                setInformationListFirst(newInformationListFirst);
                toast.success('お知らせ情報を削除しました。')
                }
                else{
                    toast.error("該当のお知らせは削除されています。")
                }

                //update all documents + history related with this interior
            } catch (e) {
                console.error(e);
            }
        },
        [informationList, informationListFirst]
    );

        const updateReadInformation = useCallback(
            async (id) => {
                try {
                    await API.graphql({
                        query: mutations.updateInformationListSend,
                        variables: {
                            input: {
                                id: id,
                                last_user_read: moment().utc(),
                            },
                        },
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            ,[])

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            let informationList = null;
            if (user.group === UserGroup.agentGrands) {
                const list = await getListInformationSendList();
                console.log(list);
                informationList = list.filter(item => {
                    // return ((moment(item.information.scheduled_delivery_date).isBefore(moment().utc(new Date()))) || !item.information.scheduled_delivery_date) && item.information.draft_flag == 0 && item.information.delete_flag == 0
                    return item.information.processed_date && item.information.draft_flag == 0 && item.information.delete_flag == 0
                })
            } else {
               let list  = await getListCSInformationSendList();
               informationList = list.map(item => {
                if(item.draft_flag == 1){
                    item.status = "下書き"
                    return item
                }
                else if(item.processed_date){
                    console.log(moment(item.scheduled_delivery_date).valueOf());
                    console.log(new Date().getTime());
                    item.status = "送信済"
                    return item
                }
                else{
                    item.status = "送信予定"
                    return item
                }
               })
            }
            console.log("DSJHFKJDSFH",informationList);
            setInformationList(informationList);
            setInformationListFirst(informationList)
            //end load list bukken
            setLoading(false);
        }

        if (isMounted() && user) loadData();
    }, [isMounted, user]);

    return {informationList, informationListFirst, page, setPage, filterInformationSendList, filterDateInformationSendList, deleteInformation, updateReadInformation, loading};
};
