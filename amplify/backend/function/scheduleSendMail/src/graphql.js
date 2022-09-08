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