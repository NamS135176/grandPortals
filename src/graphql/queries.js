/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      name
      name_kana
      receive_notification_email_flag
      delete_flag
      last_login_date
      sort
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
        receive_notification_email_flag
        delete_flag
        last_login_date
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryUserByEmail = /* GraphQL */ `
  query QueryUserByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryUserByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        name
        name_kana
        receive_notification_email_flag
        delete_flag
        last_login_date
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryUserBySort = /* GraphQL */ `
  query QueryUserBySort(
    $sort: Int!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryUserBySort(
      sort: $sort
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        name
        name_kana
        receive_notification_email_flag
        delete_flag
        last_login_date
        sort
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
        nextToken
      }
      documents {
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
      histories {
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
      sort
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
        sort
        createdAt
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
        sort
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
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryBukkenBySort = /* GraphQL */ `
  query QueryBukkenBySort(
    $sort: Int!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBukkenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryBukkenBySort(
      sort: $sort
      createdAt: $createdAt
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
        sort
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
      bukken_id
      bukken {
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
        bukken_id
        bukken {
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
          sort
          createdAt
          updatedAt
        }
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
      nextToken
    }
  }
`;
export const queryOtherObjectByBukkenId = /* GraphQL */ `
  query QueryOtherObjectByBukkenId(
    $bukken_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOtherObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryOtherObjectByBukkenId(
      bukken_id: $bukken_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bukken_id
        bukken {
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
          sort
          createdAt
          updatedAt
        }
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
        bukken_id
        bukken {
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
          sort
          createdAt
          updatedAt
        }
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
        bukken_id
        bukken {
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
          sort
          createdAt
          updatedAt
        }
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
      nextToken
    }
  }
`;
export const queryOtherObjectBySort = /* GraphQL */ `
  query QueryOtherObjectBySort(
    $sort: Int!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOtherObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryOtherObjectBySort(
      sort: $sort
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bukken_id
        bukken {
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
          sort
          createdAt
          updatedAt
        }
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
      nextToken
    }
  }
`;
export const getDocument = /* GraphQL */ `
  query GetDocument($id: ID!) {
    getDocument(id: $id) {
      id
      bukken_id
      bukken {
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
        bukken_id
        bukken {
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
          sort
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
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryDocumentByBukkenId = /* GraphQL */ `
  query QueryDocumentByBukkenId(
    $bukken_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryDocumentByBukkenId(
      bukken_id: $bukken_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bukken_id
        bukken {
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
          sort
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
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryDocumentByOtherObjectId = /* GraphQL */ `
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
        bukken {
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
          sort
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
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryDocumentByObjectKindAndCreatedAt = /* GraphQL */ `
  query QueryDocumentByObjectKindAndCreatedAt(
    $object_kind_createdAt: String!
    $object_kindBukken_id: ModelDocumentByObjectKindAndCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryDocumentByObjectKindAndCreatedAt(
      object_kind_createdAt: $object_kind_createdAt
      object_kindBukken_id: $object_kindBukken_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bukken_id
        bukken {
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
          sort
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
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryDocumentBySort = /* GraphQL */ `
  query QueryDocumentBySort(
    $sort: Int!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryDocumentBySort(
      sort: $sort
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bukken_id
        bukken {
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
          sort
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
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHistory = /* GraphQL */ `
  query GetHistory($id: ID!) {
    getHistory(id: $id) {
      id
      bukken_id
      bukken {
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
        bukken_id
        bukken {
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
          sort
          createdAt
          updatedAt
        }
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
export const queryHistoryByBukkenId = /* GraphQL */ `
  query QueryHistoryByBukkenId(
    $bukken_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryHistoryByBukkenId(
      bukken_id: $bukken_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bukken_id
        bukken {
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
          sort
          createdAt
          updatedAt
        }
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
export const queryHistoryByOtherObjectId = /* GraphQL */ `
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
        bukken {
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
          sort
          createdAt
          updatedAt
        }
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
export const queryHistoryBySort = /* GraphQL */ `
  query QueryHistoryBySort(
    $sort: Int!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryHistoryBySort(
      sort: $sort
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bukken_id
        bukken {
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
          sort
          createdAt
          updatedAt
        }
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
export const querHistoryCreatedAt = /* GraphQL */ `
  query QuerHistoryCreatedAt(
    $createdAt: AWSDateTime!
    $object_kindBukken_id: ModelHistoryByCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    querHistoryCreatedAt(
      createdAt: $createdAt
      object_kindBukken_id: $object_kindBukken_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bukken_id
        bukken {
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
          sort
          createdAt
          updatedAt
        }
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
export const getInformation = /* GraphQL */ `
  query GetInformation($id: ID!) {
    getInformation(id: $id) {
      id
      subject
      content
      scheduled_delivery_date
      important_info_flag
      draft_flag
      delete_flag
      informaionListSends {
        items {
          id
          information_id
          user_id
          email
          name
          name_kana
          withdrawal_flag
          receive_notification_email_flag
          last_user_read
          sort
          createdAt
          updatedAt
        }
        nextToken
      }
      sort
      createdAt
      updatedAt
    }
  }
`;
export const listInformation = /* GraphQL */ `
  query ListInformation(
    $id: ID
    $filter: ModelInformationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listInformation(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        subject
        content
        scheduled_delivery_date
        important_info_flag
        draft_flag
        delete_flag
        informaionListSends {
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
export const queryInformationBySort = /* GraphQL */ `
  query QueryInformationBySort(
    $sort: Int!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInformationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryInformationBySort(
      sort: $sort
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        subject
        content
        scheduled_delivery_date
        important_info_flag
        draft_flag
        delete_flag
        informaionListSends {
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
export const getInformationListSend = /* GraphQL */ `
  query GetInformationListSend($id: ID!) {
    getInformationListSend(id: $id) {
      id
      information_id
      information {
        id
        subject
        content
        scheduled_delivery_date
        important_info_flag
        draft_flag
        delete_flag
        informaionListSends {
          nextToken
        }
        sort
        createdAt
        updatedAt
      }
      user_id
      email
      name
      name_kana
      withdrawal_flag
      receive_notification_email_flag
      last_user_read
      sort
      createdAt
      updatedAt
    }
  }
`;
export const listInformationListSends = /* GraphQL */ `
  query ListInformationListSends(
    $id: ID
    $filter: ModelInformationListSendFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listInformationListSends(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        information_id
        information {
          id
          subject
          content
          scheduled_delivery_date
          important_info_flag
          draft_flag
          delete_flag
          sort
          createdAt
          updatedAt
        }
        user_id
        email
        name
        name_kana
        withdrawal_flag
        receive_notification_email_flag
        last_user_read
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryInformationListSendByInformationId = /* GraphQL */ `
  query QueryInformationListSendByInformationId(
    $information_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelInformationListSendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryInformationListSendByInformationId(
      information_id: $information_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        information_id
        information {
          id
          subject
          content
          scheduled_delivery_date
          important_info_flag
          draft_flag
          delete_flag
          sort
          createdAt
          updatedAt
        }
        user_id
        email
        name
        name_kana
        withdrawal_flag
        receive_notification_email_flag
        last_user_read
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryInformationListSendByUserId = /* GraphQL */ `
  query QueryInformationListSendByUserId(
    $user_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelInformationListSendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryInformationListSendByUserId(
      user_id: $user_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        information_id
        information {
          id
          subject
          content
          scheduled_delivery_date
          important_info_flag
          draft_flag
          delete_flag
          sort
          createdAt
          updatedAt
        }
        user_id
        email
        name
        name_kana
        withdrawal_flag
        receive_notification_email_flag
        last_user_read
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryInformationListSendBySort = /* GraphQL */ `
  query QueryInformationListSendBySort(
    $sort: Int!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInformationListSendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryInformationListSendBySort(
      sort: $sort
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        information_id
        information {
          id
          subject
          content
          scheduled_delivery_date
          important_info_flag
          draft_flag
          delete_flag
          sort
          createdAt
          updatedAt
        }
        user_id
        email
        name
        name_kana
        withdrawal_flag
        receive_notification_email_flag
        last_user_read
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const settingCognitoPassword = /* GraphQL */ `
  query SettingCognitoPassword($input: settingCognitoPasswordInput!) {
    settingCognitoPassword(input: $input)
  }
`;
export const publishPasswordResetLink = /* GraphQL */ `
  query PublishPasswordResetLink($email: String!) {
    publishPasswordResetLink(email: $email)
  }
`;
export const createForceResetPassword = /* GraphQL */ `
  query CreateForceResetPassword($email: String!) {
    createForceResetPassword(email: $email)
  }
`;
export const checkLinkValidation = /* GraphQL */ `
  query CheckLinkValidation($id: ID!) {
    checkLinkValidation(id: $id)
  }
`;
export const getNextDocumentId = /* GraphQL */ `
  query GetNextDocumentId {
    getNextDocumentId
  }
`;
export const getNextHistoryId = /* GraphQL */ `
  query GetNextHistoryId {
    getNextHistoryId
  }
`;
export const getNextBukkenId = /* GraphQL */ `
  query GetNextBukkenId {
    getNextBukkenId
  }
`;
export const getNextOtherObjectId = /* GraphQL */ `
  query GetNextOtherObjectId {
    getNextOtherObjectId
  }
`;
export const getNextInformationId = /* GraphQL */ `
  query GetNextInformationId {
    getNextInformationId
  }
`;
export const getNextInformationListSendId = /* GraphQL */ `
  query GetNextInformationListSendId {
    getNextInformationListSendId
  }
`;
export const withdrawalRequest = /* GraphQL */ `
  query WithdrawalRequest($name: String!) {
    withdrawalRequest(name: $name)
  }
`;
export const publishInformationZipFile = /* GraphQL */ `
  query PublishInformationZipFile($folder: String!, $zipFileName: String!) {
    publishInformationZipFile(folder: $folder, zipFileName: $zipFileName)
  }
`;
