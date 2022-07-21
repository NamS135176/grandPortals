export type AmplifyDependentResourcesAttributes = {
    "function": {
        "grandsPortalPostConfirmation": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        }
    },
    "api": {
        "grandsportal": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "storage": {
        "grandsPortal": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}