export const queryBukkensByUserIdWithCoverImage = /* GraphQL */ `
    query QueryBukkensByUserId(
        $user_id: ID!
        $sortDirection: ModelSortDirection
        $filter: ModelBukkenFilterInput
        $limit: Int
        $nextToken: String
    ) {
        queryBukkensByUserId(
            user_id: $user_id
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
                s_object_id
                bukken_no
                user_id
                address
                bukken_kind
                floor_plan
                shinchiku_date
                remarks
                delete_flag
                otherObjects(filter: {object_kind: {eq: "0"}}) {
                    nextToken
                    items {
                        bukken_id
                        createdAt
                        delete_flag
                        field_kind
                        field_list
                        id
                        object_kind
                        object_kind_updatedAt
                        room_id
                        sort
                        updatedAt
                        user_id
                    }
                }
                documents {
                    nextToken
                }
                histories {
                    nextToken
                }
                sort
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`;
