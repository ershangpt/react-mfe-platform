import { createApiClient } from '@company/api-client';
import { getAccessToken } from '../auth/authService';

export const apiClient = createApiClient({
  baseUrl: 'http://localhost:8080',
  getAccessToken,
});