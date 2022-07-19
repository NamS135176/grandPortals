import {API} from "aws-amplify";
import {useEffect, useState} from "react";
import {queryBukkensByBukkenNo} from "../graphql/queries";
import {useAuth} from "./use-auth";
import {useMounted} from "./use-mounted";

export const useBukkenDetail = (bukkenNo) => {
    const isMounted = useMounted();
    const [bukken, setBukken] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            //load bukken detail
            const response = await API.graphql({
                query: queryBukkensByBukkenNo,
                variables: {
                    bukken_no: bukkenNo,
                },
            });
            const {items} = response.data.queryBukkensByBukkenNo;
            if (items?.length > 0) {
                setBukken(items[0]);
            }
            //end load list bukken
            setLoading(false);
        }

        if (isMounted && bukkenNo) loadData();
    }, [isMounted, bukkenNo]);

    return {bukken, loading};
};
