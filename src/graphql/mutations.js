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
          bukken_no
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
      createdAt
      updatedAt
      owner
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
          bukken_no
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
      createdAt
      updatedAt
      owner
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
          bukken_no
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
      createdAt
      updatedAt
      owner
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
        createdAt
        updatedAt
        owner
      }
      bukken_no
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
export const updateOtherObject = /* GraphQL */ `
  mutation UpdateOtherObject(
    $input: UpdateOtherObjectInput!
    $condition: ModelOtherObjectConditionInput
  ) {
    updateOtherObject(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
        owner
      }
      bukken_no
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
export const deleteOtherObject = /* GraphQL */ `
  mutation DeleteOtherObject(
    $input: DeleteOtherObjectInput!
    $condition: ModelOtherObjectConditionInput
  ) {
    deleteOtherObject(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
        owner
      }
      bukken_no
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
export const createDocument = /* GraphQL */ `
  mutation CreateDocument(
    $input: CreateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    createDocument(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
        owner
      }
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
export const updateDocument = /* GraphQL */ `
  mutation UpdateDocument(
    $input: UpdateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    updateDocument(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
        owner
      }
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
export const deleteDocument = /* GraphQL */ `
  mutation DeleteDocument(
    $input: DeleteDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    deleteDocument(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
        owner
      }
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
