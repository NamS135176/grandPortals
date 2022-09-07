/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($id: String) {
    onCreateUser(id: $id) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($id: String) {
    onUpdateUser(id: $id) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($id: String) {
    onDeleteUser(id: $id) {
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
  subscription OnCreateBukken($user_id: String) {
    onCreateBukken(user_id: $user_id) {
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
export const onUpdateBukken = /* GraphQL */ `
  subscription OnUpdateBukken($user_id: String) {
    onUpdateBukken(user_id: $user_id) {
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
export const onDeleteBukken = /* GraphQL */ `
  subscription OnDeleteBukken($user_id: String) {
    onDeleteBukken(user_id: $user_id) {
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
export const onCreateOtherObject = /* GraphQL */ `
  subscription OnCreateOtherObject($user_id: String) {
    onCreateOtherObject(user_id: $user_id) {
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
export const onUpdateOtherObject = /* GraphQL */ `
  subscription OnUpdateOtherObject($user_id: String) {
    onUpdateOtherObject(user_id: $user_id) {
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
export const onDeleteOtherObject = /* GraphQL */ `
  subscription OnDeleteOtherObject($user_id: String) {
    onDeleteOtherObject(user_id: $user_id) {
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
export const onCreateDocument = /* GraphQL */ `
  subscription OnCreateDocument($user_id: String) {
    onCreateDocument(user_id: $user_id) {
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
export const onUpdateDocument = /* GraphQL */ `
  subscription OnUpdateDocument($user_id: String) {
    onUpdateDocument(user_id: $user_id) {
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
export const onDeleteDocument = /* GraphQL */ `
  subscription OnDeleteDocument($user_id: String) {
    onDeleteDocument(user_id: $user_id) {
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
export const onCreateHistory = /* GraphQL */ `
  subscription OnCreateHistory($user_id: String) {
    onCreateHistory(user_id: $user_id) {
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
export const onUpdateHistory = /* GraphQL */ `
  subscription OnUpdateHistory($user_id: String) {
    onUpdateHistory(user_id: $user_id) {
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
export const onDeleteHistory = /* GraphQL */ `
  subscription OnDeleteHistory($user_id: String) {
    onDeleteHistory(user_id: $user_id) {
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
export const onCreateInformation = /* GraphQL */ `
  subscription OnCreateInformation {
    onCreateInformation {
      id
      subject
      content
      scheduled_delivery_date
      important_info_flag
      draft_flag
      delete_flag
      processed_date
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
          sendgrid_response
          x_message_id
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
export const onUpdateInformation = /* GraphQL */ `
  subscription OnUpdateInformation {
    onUpdateInformation {
      id
      subject
      content
      scheduled_delivery_date
      important_info_flag
      draft_flag
      delete_flag
      processed_date
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
          sendgrid_response
          x_message_id
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
export const onDeleteInformation = /* GraphQL */ `
  subscription OnDeleteInformation {
    onDeleteInformation {
      id
      subject
      content
      scheduled_delivery_date
      important_info_flag
      draft_flag
      delete_flag
      processed_date
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
          sendgrid_response
          x_message_id
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
export const onCreateInformationListSend = /* GraphQL */ `
  subscription OnCreateInformationListSend($user_id: String) {
    onCreateInformationListSend(user_id: $user_id) {
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
        processed_date
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
      sendgrid_response
      x_message_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInformationListSend = /* GraphQL */ `
  subscription OnUpdateInformationListSend($user_id: String) {
    onUpdateInformationListSend(user_id: $user_id) {
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
        processed_date
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
      sendgrid_response
      x_message_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInformationListSend = /* GraphQL */ `
  subscription OnDeleteInformationListSend($user_id: String) {
    onDeleteInformationListSend(user_id: $user_id) {
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
        processed_date
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
      sendgrid_response
      x_message_id
      createdAt
      updatedAt
    }
  }
`;
