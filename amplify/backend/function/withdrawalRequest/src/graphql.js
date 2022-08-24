module.exports.updateUser = /* GraphQL */ `
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

module.exports.getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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