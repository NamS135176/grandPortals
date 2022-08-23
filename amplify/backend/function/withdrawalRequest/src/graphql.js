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