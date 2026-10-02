import type {
  AuthContract,
} from '@company/auth-contract';

import {
  getAccessToken,
  getCurrentUser,
  isAuthenticated,
  logout,
} from './authService';

export const authContract: AuthContract = {
  getAccessToken,
  getCurrentUser,
  isAuthenticated,
  logout,
};