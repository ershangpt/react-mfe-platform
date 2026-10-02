import type { AuthContract } from '@company/auth-contract';

let auth: AuthContract | null = null;

export function configureAuth(
  authContract: AuthContract,
) {
  auth = authContract;
}

export function getAuth(): AuthContract {
  if (!auth) {
    throw new Error(
      'Authentication has not been configured',
    );
  }

  return auth;
}