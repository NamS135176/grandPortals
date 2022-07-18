/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateCS = /* GraphQL */ `
  subscription OnCreateCS {
    onCreateCS {
      email
      delete_flag
      last_login_date
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCS = /* GraphQL */ `
  subscription OnUpdateCS {
    onUpdateCS {
      email
      delete_flag
      last_login_date
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCS = /* GraphQL */ `
  subscription OnDeleteCS {
    onDeleteCS {
      email
      delete_flag
      last_login_date
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserTempResetPassword = /* GraphQL */ `
  subscription OnCreateUserTempResetPassword {
    onCreateUserTempResetPassword {
      id
      email
      delete_flag
      createdAt
      ttl
      updatedAt
    }
  }
`;
export const onUpdateUserTempResetPassword = /* GraphQL */ `
  subscription OnUpdateUserTempResetPassword {
    onUpdateUserTempResetPassword {
      id
      email
      delete_flag
      createdAt
      ttl
      updatedAt
    }
  }
`;
export const onDeleteUserTempResetPassword = /* GraphQL */ `
  subscription OnDeleteUserTempResetPassword {
    onDeleteUserTempResetPassword {
      id
      email
      delete_flag
      createdAt
      ttl
      updatedAt
    }
  }
`;
export const onCreateBukken = /* GraphQL */ `
  subscription OnCreateBukken($owner: String) {
    onCreateBukken(owner: $owner) {
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
export const onUpdateBukken = /* GraphQL */ `
  subscription OnUpdateBukken($owner: String) {
    onUpdateBukken(owner: $owner) {
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
export const onDeleteBukken = /* GraphQL */ `
  subscription OnDeleteBukken($owner: String) {
    onDeleteBukken(owner: $owner) {
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
export const onCreateOtherObject = /* GraphQL */ `
  subscription OnCreateOtherObject {
    onCreateOtherObject {
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
export const onUpdateOtherObject = /* GraphQL */ `
  subscription OnUpdateOtherObject {
    onUpdateOtherObject {
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
export const onDeleteOtherObject = /* GraphQL */ `
  subscription OnDeleteOtherObject {
    onDeleteOtherObject {
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
export const onCreateDocument = /* GraphQL */ `
  subscription OnCreateDocument {
    onCreateDocument {
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
export const onUpdateDocument = /* GraphQL */ `
  subscription OnUpdateDocument {
    onUpdateDocument {
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
export const onDeleteDocument = /* GraphQL */ `
  subscription OnDeleteDocument {
    onDeleteDocument {
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
