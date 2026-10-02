import type { AuthSession, AuthUser } from './authTypes';

let session: AuthSession | null = null;

export function login(user: AuthUser): AuthSession {
  session = {
    accessToken: 'demo-access-token',
    user,
  };

  return session;
}

export function logout(): void {
  session = null;
}

export function getAccessToken(): string | null {
  return session?.accessToken ?? null;
}

export function getCurrentUser(): AuthUser | null {
  return session?.user ?? null;
}

export function isAuthenticated(): boolean {
  return session !== null;
}