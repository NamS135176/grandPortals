/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      name
      name_kana
      delete_flag
      last_login_date
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        email
        name
        name_kana
        delete_flag
        last_login_date
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCS = /* GraphQL */ `
  query GetCS($email: String!) {
    getCS(email: $email) {
      email
      delete_flag
      last_login_date
      createdAt
      updatedAt
    }
  }
`;
export const listCS = /* GraphQL */ `
  query ListCS(
    $email: String
    $filter: ModelCSFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCS(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        email
        delete_flag
        last_login_date
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserTempResetPassword = /* GraphQL */ `
  query GetUserTempResetPassword($id: ID!) {
    getUserTempResetPassword(id: $id) {
      id
      email
      delete_flag
      createdAt
      ttl
      updatedAt
    }
  }
`;
export const listUserTempResetPasswords = /* GraphQL */ `
  query ListUserTempResetPasswords(
    $id: ID
    $filter: ModelUserTempResetPasswordFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserTempResetPasswords(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        email
        delete_flag
        createdAt
        ttl
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBukken = /* GraphQL */ `
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
        items {
          id
          bukken_no
          user_id
          object_kind
          room_id
          field_kind
          field_list
          delete_flag
          object_kind_updatedAt
          createdAt
          updatedAt
          bukkenOtherObjectsId
        }
        nextToken
      }
      documents {
        items {
          id
          user_id
          other_object_id
          object_kind
          orignal_file_name
          s3_file_name
          overview
          delete_flag
          object_kind_createdAt
          createdAt
          updatedAt
          bukkenDocumentsId
        }
        nextToken
      }
      histories {
        items {
          id
          user_id
          other_object_id
          object_kind
          remarks
          overview
          delete_flag
          createdAt
          updatedAt
          bukkenHistoriesId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listBukkens = /* GraphQL */ `
  query ListBukkens(
    $id: ID
    $filter: ModelBukkenFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBukkens(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
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
        otherObjects {
          nextToken
        }
        documents {
          nextToken
        }
        histories {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOtherObject = /* GraphQL */ `
  query GetOtherObject($id: ID!) {
    getOtherObject(id: $id) {
      id
      buken {
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
        createdAt
        updatedAt
      }
      bukken_no
      user_id
      object_kind
      room_id
      field_kind
      field_list
      delete_flag
      object_kind_updatedAt
      createdAt
      updatedAt
      bukkenOtherObjectsId
    }
  }
`;
export const listOtherObjects = /* GraphQL */ `
  query ListOtherObjects(
    $id: ID
    $filter: ModelOtherObjectFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOtherObjects(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        buken {
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
          createdAt
          updatedAt
        }
        bukken_no
        user_id
        object_kind
        room_id
        field_kind
        field_list
        delete_flag
        object_kind_updatedAt
        createdAt
        updatedAt
        bukkenOtherObjectsId
      }
      nextToken
    }
  }
`;
export const getDocument = /* GraphQL */ `
  query GetDocument($id: ID!) {
    getDocument(id: $id) {
      id
      buken {
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
        createdAt
        updatedAt
      }
      user_id
      other_object_id
      object_kind
      orignal_file_name
      s3_file_name
      overview
      delete_flag
      object_kind_createdAt
      createdAt
      updatedAt
      bukkenDocumentsId
    }
  }
`;
export const listDocuments = /* GraphQL */ `
  query ListDocuments(
    $id: ID
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDocuments(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        buken {
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
          createdAt
          updatedAt
        }
        user_id
        other_object_id
        object_kind
        orignal_file_name
        s3_file_name
        overview
        delete_flag
        object_kind_createdAt
        createdAt
        updatedAt
        bukkenDocumentsId
      }
      nextToken
    }
  }
`;
export const getHistory = /* GraphQL */ `
  query GetHistory($id: ID!) {
    getHistory(id: $id) {
      id
      buken {
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
        createdAt
        updatedAt
      }
      user_id
      other_object_id
      object_kind
      remarks
      overview
      delete_flag
      createdAt
      updatedAt
      bukkenHistoriesId
    }
  }
`;
export const listHistories = /* GraphQL */ `
  query ListHistories(
    $id: ID
    $filter: ModelHistoryFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listHistories(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        buken {
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
          createdAt
          updatedAt
        }
        user_id
        other_object_id
        object_kind
        remarks
        overview
        delete_flag
        createdAt
        updatedAt
        bukkenHistoriesId
      }
      nextToken
    }
  }
`;
export const queryUserTempResetPasswordByCreatedAt = /* GraphQL */ `
  query QueryUserTempResetPasswordByCreatedAt(
    $createdAt: AWSDateTime!
    $sortDirection: ModelSortDirection
    $filter: ModelUserTempResetPasswordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryUserTempResetPasswordByCreatedAt(
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        delete_flag
        createdAt
        ttl
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryBukkensByBukkenNo = /* GraphQL */ `
  query QueryBukkensByBukkenNo(
    $bukken_no: String!
    $user_id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBukkenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryBukkensByBukkenNo(
      bukken_no: $bukken_no
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
        otherObjects {
          nextToken
        }
        documents {
          nextToken
        }
        histories {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryBukkensByUserId = /* GraphQL */ `
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
        otherObjects {
          nextToken
        }
        documents {
          nextToken
        }
        histories {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryOtherObjectByRoomId = /* GraphQL */ `
  query QueryOtherObjectByRoomId(
    $room_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOtherObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryOtherObjectByRoomId(
      room_id: $room_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        buken {
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
          createdAt
          updatedAt
        }
        bukken_no
        user_id
        object_kind
        room_id
        field_kind
        field_list
        delete_flag
        object_kind_updatedAt
        createdAt
        updatedAt
        bukkenOtherObjectsId
      }
      nextToken
    }
  }
`;
export const queryOtherObjectByObjectKindAndUpdatedAt = /* GraphQL */ `
  query QueryOtherObjectByObjectKindAndUpdatedAt(
    $object_kind_updatedAt: String!
    $sortDirection: ModelSortDirection
    $filter: ModelOtherObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryOtherObjectByObjectKindAndUpdatedAt(
      object_kind_updatedAt: $object_kind_updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        buken {
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
          createdAt
          updatedAt
        }
        bukken_no
        user_id
        object_kind
        room_id
        field_kind
        field_list
        delete_flag
        object_kind_updatedAt
        createdAt
        updatedAt
        bukkenOtherObjectsId
      }
      nextToken
    }
  }
`;
export const querDocumentByOtherObjectId = /* GraphQL */ `
  query QuerDocumentByOtherObjectId(
    $other_object_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    querDocumentByOtherObjectId(
      other_object_id: $other_object_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        buken {
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
          createdAt
          updatedAt
        }
        user_id
        other_object_id
        object_kind
        orignal_file_name
        s3_file_name
        overview
        delete_flag
        object_kind_createdAt
        createdAt
        updatedAt
        bukkenDocumentsId
      }
      nextToken
    }
  }
`;
export const queryDocumentByObjectKindAndCreatedAt = /* GraphQL */ `
  query QueryDocumentByObjectKindAndCreatedAt(
    $object_kind_createdAt: String!
    $other_object_id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryDocumentByObjectKindAndCreatedAt(
      object_kind_createdAt: $object_kind_createdAt
      other_object_id: $other_object_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        buken {
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
          createdAt
          updatedAt
        }
        user_id
        other_object_id
        object_kind
        orignal_file_name
        s3_file_name
        overview
        delete_flag
        object_kind_createdAt
        createdAt
        updatedAt
        bukkenDocumentsId
      }
      nextToken
    }
  }
`;
export const querHistoryByOtherObjectId = /* GraphQL */ `
  query QuerHistoryByOtherObjectId(
    $other_object_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    querHistoryByOtherObjectId(
      other_object_id: $other_object_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        buken {
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
          createdAt
          updatedAt
        }
        user_id
        other_object_id
        object_kind
        remarks
        overview
        delete_flag
        createdAt
        updatedAt
        bukkenHistoriesId
      }
      nextToken
    }
  }
`;
export const querHistoryCreatedAt = /* GraphQL */ `
  query QuerHistoryCreatedAt(
    $createdAt: AWSDateTime!
    $other_object_id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    querHistoryCreatedAt(
      createdAt: $createdAt
      other_object_id: $other_object_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        buken {
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
          createdAt
          updatedAt
        }
        user_id
        other_object_id
        object_kind
        remarks
        overview
        delete_flag
        createdAt
        updatedAt
        bukkenHistoriesId
      }
      nextToken
    }
  }
`;
