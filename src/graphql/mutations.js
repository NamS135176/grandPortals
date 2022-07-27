/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      name
      name_kana
      delete_flag
      last_login_date
      sort
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      name
      name_kana
      delete_flag
      last_login_date
      sort
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      name
      name_kana
      delete_flag
      last_login_date
      sort
      createdAt
      updatedAt
    }
  }
`;
export const createCS = /* GraphQL */ `
  mutation CreateCS($input: CreateCSInput!, $condition: ModelCSConditionInput) {
    createCS(input: $input, condition: $condition) {
      email
      delete_flag
      last_login_date
      createdAt
      updatedAt
    }
  }
`;
export const updateCS = /* GraphQL */ `
  mutation UpdateCS($input: UpdateCSInput!, $condition: ModelCSConditionInput) {
    updateCS(input: $input, condition: $condition) {
      email
      delete_flag
      last_login_date
      createdAt
      updatedAt
    }
  }
`;
export const deleteCS = /* GraphQL */ `
  mutation DeleteCS($input: DeleteCSInput!, $condition: ModelCSConditionInput) {
    deleteCS(input: $input, condition: $condition) {
      email
      delete_flag
      last_login_date
      createdAt
      updatedAt
    }
  }
`;
export const createUserTempResetPassword = /* GraphQL */ `
  mutation CreateUserTempResetPassword(
    $input: CreateUserTempResetPasswordInput!
    $condition: ModelUserTempResetPasswordConditionInput
  ) {
    createUserTempResetPassword(input: $input, condition: $condition) {
      id
      email
      delete_flag
      createdAt
      ttl
      updatedAt
    }
  }
`;
export const updateUserTempResetPassword = /* GraphQL */ `
  mutation UpdateUserTempResetPassword(
    $input: UpdateUserTempResetPasswordInput!
    $condition: ModelUserTempResetPasswordConditionInput
  ) {
    updateUserTempResetPassword(input: $input, condition: $condition) {
      id
      email
      delete_flag
      createdAt
      ttl
      updatedAt
    }
  }
`;
export const deleteUserTempResetPassword = /* GraphQL */ `
  mutation DeleteUserTempResetPassword(
    $input: DeleteUserTempResetPasswordInput!
    $condition: ModelUserTempResetPasswordConditionInput
  ) {
    deleteUserTempResetPassword(input: $input, condition: $condition) {
      id
      email
      delete_flag
      createdAt
      ttl
      updatedAt
    }
  }
`;
export const createBukken = /* GraphQL */ `
  mutation CreateBukken(
    $input: CreateBukkenInput!
    $condition: ModelBukkenConditionInput
  ) {
    createBukken(input: $input, condition: $condition) {
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
export const updateBukken = /* GraphQL */ `
  mutation UpdateBukken(
    $input: UpdateBukkenInput!
    $condition: ModelBukkenConditionInput
  ) {
    updateBukken(input: $input, condition: $condition) {
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
export const deleteBukken = /* GraphQL */ `
  mutation DeleteBukken(
    $input: DeleteBukkenInput!
    $condition: ModelBukkenConditionInput
  ) {
    deleteBukken(input: $input, condition: $condition) {
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
export const createOtherObject = /* GraphQL */ `
  mutation CreateOtherObject(
    $input: CreateOtherObjectInput!
    $condition: ModelOtherObjectConditionInput
  ) {
    createOtherObject(input: $input, condition: $condition) {
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
export const updateOtherObject = /* GraphQL */ `
  mutation UpdateOtherObject(
    $input: UpdateOtherObjectInput!
    $condition: ModelOtherObjectConditionInput
  ) {
    updateOtherObject(input: $input, condition: $condition) {
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
export const deleteOtherObject = /* GraphQL */ `
  mutation DeleteOtherObject(
    $input: DeleteOtherObjectInput!
    $condition: ModelOtherObjectConditionInput
  ) {
    deleteOtherObject(input: $input, condition: $condition) {
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
export const createDocument = /* GraphQL */ `
  mutation CreateDocument(
    $input: CreateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    createDocument(input: $input, condition: $condition) {
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
export const updateDocument = /* GraphQL */ `
  mutation UpdateDocument(
    $input: UpdateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    updateDocument(input: $input, condition: $condition) {
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
export const deleteDocument = /* GraphQL */ `
  mutation DeleteDocument(
    $input: DeleteDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    deleteDocument(input: $input, condition: $condition) {
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
export const createHistory = /* GraphQL */ `
  mutation CreateHistory(
    $input: CreateHistoryInput!
    $condition: ModelHistoryConditionInput
  ) {
    createHistory(input: $input, condition: $condition) {
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
export const updateHistory = /* GraphQL */ `
  mutation UpdateHistory(
    $input: UpdateHistoryInput!
    $condition: ModelHistoryConditionInput
  ) {
    updateHistory(input: $input, condition: $condition) {
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
export const deleteHistory = /* GraphQL */ `
  mutation DeleteHistory(
    $input: DeleteHistoryInput!
    $condition: ModelHistoryConditionInput
  ) {
    deleteHistory(input: $input, condition: $condition) {
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
