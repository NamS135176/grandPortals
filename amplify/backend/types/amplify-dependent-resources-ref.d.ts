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
        },
        "salesforce2AWSRegistration": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
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