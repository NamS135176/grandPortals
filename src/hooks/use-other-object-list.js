import {API} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {useMounted} from "./use-mounted";
import * as R from "ramda";
import {listOtherObjects} from "../graphql/queries";
import * as mutations from "../graphql/mutations";

export const useOtherObjectList = (bukkenId, otherObjectKind) => {
    const isMounted = useMounted();
    const [otherObjects, setOtherObjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const getListInterior = useCallback(
        async (list = [], nextToken = null, bukkenId) => {
            const response = null;
            if (bukkenId) {
                response = await API.graphql({
                    query: listOtherObjects,
                    nextToken: nextToken,
                    variables: {
                        filter: {
                            object_kind: {
                                eq: otherObjectKind,
                            },
                            delete_flag: {
                                eq: 0,
                            },
                            bukken_id: {
                                eq: bukkenId,
                            },
                        },
                    },
                });
            } else {
                response = await API.graphql({
                    query: listOtherObjects,
                    variables: {
                        nextToken: nextToken,
                        filter: {
                            object_kind: {
                                eq: otherObjectKind,
                            },
                            delete_flag: {
                                eq: 0,
                            },
                        },
                    },
                });
            }
            var otherObjects = response.data.listOtherObjects.items;
            if (!R.isNil(otherObjects) && !R.isEmpty(otherObjects)) {
                otherObjects.forEach((interior) => {
                    try {
                        //parse field_list to get cover image with thumnail key
                        const fieldList = interior.field_list
                            ? JSON.parse(interior.field_list)
                            : {};
                        interior.field_list = fieldList;
                        if (fieldList && fieldList["thumnail"]) {
                            interior.image = fieldList["thumnail"];
                        }
                        if (fieldList && fieldList["type"]) {
                            interior.type = fieldList["type"];
                        }
                        if (fieldList && fieldList["name"]) {
                            interior.name = fieldList["name"];
                        }
                    } catch (e) {
                        console.error(e);
                    }
                });
            }
            list = list.concat(otherObjects);
            if (response.data.listOtherObjects.nextToken) {
                await getListInterior(
                    list,
                    response.data.listOtherObjects.nextToken,
                    bukkenId
                );
            }
            return list;
        },
        [otherObjectKind]
    );

    const deleteObject = useCallback(
        async (interior) => {
            try {
                await API.graphql({
                    query: mutations.updateOtherObject,
                    variables: {
                        input: {
                            id: interior.id,
                            delete_flag: 1,
                        },
                    },
                });
                const newInteriors = R.reject(R.propEq("id", interior.id))(
                    otherObjects
                );
                setOtherObjects(newInteriors);
            } catch (e) {
                console.error(e);
            }
        },
        [otherObjects]
    );

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const otherObjects = await getListInterior([], null, bukkenId);
            setOtherObjects(otherObjects);
            setLoading(false);
        }

        if (isMounted) loadData();
    }, [isMounted, bukkenId]);

    return {otherObjects, deleteObject, loading};
};
