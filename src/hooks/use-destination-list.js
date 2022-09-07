import {API} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {useMounted} from "./use-mounted";
import * as R from "ramda";
import * as mutations from "../graphql/mutations";
import {OtherObjectKind} from "../utils/bukken";
import {useDeleteDocument} from "./use-delete-document";
import {useDeleteHistory} from "./use-delete-history";
import {useDeleteInterior} from "./use-delete-interior";
import {queryInformationListSendByInformationId} from "graphql/queries";

export const useDestinationList = (informationId) => {
    const isMounted = useMounted();
    const [destinations, setDestinations] = useState([]);
    const [destinationsFirst, setDestinationsFirst] = useState([]);
    const [loading, setLoading] = useState(false);

    const getListDestination = useCallback(
        async (list = [], nextToken = null, informationId) => {
            const response = await API.graphql({
                query: queryInformationListSendByInformationId,
                variables: {
                    nextToken: nextToken,
                    information_id: informationId
                },
            });
            var rooms = response.data.queryInformationListSendByInformationId.items;
            list = list.concat(rooms);
            if (response.data.queryInformationListSendByInformationId.nextToken) {
                await getListDestination(
                    list,
                    response.data.queryInformationListSendByInformationId.nextToken,
                    informationId
                );
            }
            return list;
        },
        [informationId]
    );

    const applyFilters = (items, filters) =>
	items.filter((item) => {
		if (filters.email) {
			const nameMatched = item.email
				.toLowerCase()
				.includes(filters.email.toLowerCase());

			if (!nameMatched) {
				return false;
			}
		}

		// It is possible to select multiple category options
		if (filters.name) {
			const statusMatched = item.name
				.toLowerCase()
				.includes(
					filters.name.toLowerCase()
				) || item.name_kana
				.toLowerCase()
				.includes(
					filters.name.toLowerCase()
				)


			if (!statusMatched) {
				return false;
			}
		}

		return true;
	});

    const filterDestination = (filter) =>  {
        const newList = applyFilters(destinationsFirst, filter)
        setDestinations(newList)
    }

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            const listDestination = await getListDestination([], null, informationId);
            setDestinations(listDestination);
            //end load list bukken
            setDestinationsFirst(listDestination)
            setLoading(false);
        }

        if (isMounted() && informationId) loadData();
    }, [isMounted, informationId]);

    return {destinations, filterDestination, loading};
};
