## 1. Create bukken
mutation MyMutation {
  createBukken(input: {address: "神奈川県XX市XX町１番地", bukken_kind: "1", bukken_no: "HONR000256", delete_flag: 0, floor_plan: "２LDK", id: "000001", remarks: "あいうえお", s_object_id: "a011000000Mttc4AAB", sort: 1, user_id: "a7fff7a8-e72e-465c-9073-88114ad2b216"}) {
    id
  }
}

## 2. Query list bukken by user id with cover image
query MyQuery {
  queryBukkensByUserId(user_id: "a7fff7a8-e72e-465c-9073-88114ad2b216") {
    items {
      address
      bukken_kind
      bukken_no
      createdAt
      delete_flag
      floor_plan
      id
      remarks
      s_object_id
      shinchiku_date
      sort
      updatedAt
      user_id
      otherObjects(filter: {object_kind: {eq: "0"}}) {
        items {
          bukken_id
          bukken_no
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
    }
  }
}

