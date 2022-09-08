module.exports.listInformation = /* GraphQL */ `
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
      processed_date
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

module.exports.queryInformationListSendByInformationId = /* GraphQL */ `
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
        processed_date
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
    nextToken
  }
}
`;