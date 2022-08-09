import awsExports from "./aws-exports";

const {
  aws_project_region,
  aws_cognito_identity_pool_id,
  aws_cognito_region,
  aws_user_pools_id,
  aws_user_pools_web_client_id,
} = awsExports;

export const amplifyConfig = {
  aws_project_region,
  aws_cognito_identity_pool_id,
  aws_cognito_region,
  aws_user_pools_id,
  aws_user_pools_web_client_id,
};

export const auth0Config = {
  client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
};

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

export const gtmConfig = {
  containerId: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID,
};