import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-west-1_1yHIEzZbl',
  ClientId: '35h9thgi9vjscvr5j8v3pv8pve',
};

export const userPool = new CognitoUserPool(poolData);
