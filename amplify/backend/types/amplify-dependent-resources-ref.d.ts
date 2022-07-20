export type AmplifyDependentResourcesAttributes = {
    "api": {
        "grandsportal": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "grandsportal6db2a71e": {
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "storage": {
        "grandsPortal": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "grandsportal6db2a71ePostConfirmation": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        }
    }
}