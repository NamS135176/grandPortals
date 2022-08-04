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

export const getBukkenOnly = /* GraphQL */ `
  query GetBukken($id: ID!) {
    getBukken(id: $id) {
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
      otherObjects {
        nextToken
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
  }
`;

export const queryDocumentOnlyByOtherObjectId = /* GraphQL */ `
  query QueryDocumentByOtherObjectId(
    $other_object_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryDocumentByOtherObjectId(
      other_object_id: $other_object_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bukken_id
        user_id
        other_object_id
        object_kind
        orignal_file_name
        s3_file_name
        overview
        delete_flag
        object_kind_createdAt
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const queryHistoryOnlyByOtherObjectId = /* GraphQL */ `
  query QueryHistoryByOtherObjectId(
    $other_object_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryHistoryByOtherObjectId(
      other_object_id: $other_object_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bukken_id
        user_id
        other_object_id
        object_kind
        remarks
        overview
        delete_flag
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getOtherObjectOnly = /* GraphQL */ `
  query GetOtherObject($id: ID!) {
    getOtherObject(id: $id) {
      id
      bukken_id
      user_id
      object_kind
      room_id
      field_kind
      field_list
      delete_flag
      object_kind_updatedAt
      sort
      createdAt
      updatedAt
    }
  }
`;