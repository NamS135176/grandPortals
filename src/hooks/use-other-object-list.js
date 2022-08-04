import {API} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {useMounted} from "./use-mounted";
import * as R from "ramda";
import {listOtherObjects} from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import {useDocument} from "./use-document";
import {useHistory} from "./use-history";

export const useOtherObjectList = (bukkenId, otherObjectKind) => {
    const isMounted = useMounted();
    const [otherObjects, setOtherObjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const {deleteAllDocumentByOtherObjectId} = useDocument();
    const {deleteAllHistoryByOtherObjectId} = useHistory();

    const getListOtherObject = useCallback(
        async (list = [], nextToken = null, bukkenId) => {
            const response = null;
            const variables = {
                limit: 1000,
                nextToken: nextToken,
                filter: {
                    object_kind: {
                        eq: otherObjectKind,
                    },
                    delete_flag: {
                        eq: 0,
                    },
                },
            };
            if (bukkenId) {
                variables["bukken_id"] = {
                    eq: bukkenId,
                };
            }
            response = await API.graphql({
                query: listOtherObjects,
                nextToken: nextToken,
                variables,
            });
            var otherObjects = response.data.listOtherObjects.items;
            if (!R.isNil(otherObjects) && !R.isEmpty(otherObjects)) {
                otherObjects.forEach((otherObject) => {
                    try {
                        //parse field_list to get cover image with thumnail key
                        const fieldList = otherObject.field_list
                            ? JSON.parse(otherObject.field_list)
                            : {};
                        otherObject.field_list = fieldList;
                        if (fieldList && fieldList["thumnail"]) {
                            otherObject.image = fieldList["thumnail"];
                        }
                        if (fieldList && fieldList["type"]) {
                            otherObject.type = fieldList["type"];
                        }
                        if (fieldList && fieldList["name"]) {
                            otherObject.name = fieldList["name"];
                        }
                    } catch (e) {
                        console.error(e);
                    }
                });
            }
            list = list.concat(otherObjects);
            if (response.data.listOtherObjects.nextToken) {
                await getListOtherObject(
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
        async (otherObject) => {
            try {
                await API.graphql({
                    query: mutations.updateOtherObject,
                    variables: {
                        input: {
                            id: otherObject.id,
                            delete_flag: 1,
                        },
                    },
                });
                const newOtherObjects = R.reject(
                    R.propEq("id", otherObject.id)
                )(otherObjects);
                setOtherObjects(newOtherObjects);
                //update all documents + history related with this other object
                await deleteAllDocumentByOtherObjectId(otherObject.id);
                await deleteAllHistoryByOtherObjectId(otherObject.id);
            } catch (e) {
                console.error(e);
            }
        },
        [otherObjects]
    );

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const otherObjects = await getListOtherObject([], null, bukkenId);
            setOtherObjects(otherObjects);
            setLoading(false);
        }

        if (isMounted && bukkenId) loadData();
    }, [isMounted, bukkenId]);

    return {otherObjects, deleteObject, loading};
};
