export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "userPoolGroups": {
            "agentGrandsGroupRole": "string",
            "agentNormalGroupRole": "string",
            "supportGroupRole": "string"
        },
        "grandsPortal": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
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
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    }
}