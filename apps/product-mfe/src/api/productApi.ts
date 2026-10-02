import { getAuth } from '../auth/auth';
import { createApiClient } from '@company/api-client';

export type Product = {
  id: number;
  name: string;
  price: number;
};

const apiClient = createApiClient({
  baseUrl: 'http://localhost:8080',
  getAccessToken: () => getAuth().getAccessToken(),
});


export async function getProducts(): Promise<Product[]> {
  const auth = getAuth();

  if (!auth.isAuthenticated()) {
    throw new Error('User is not authenticated');
  }

  const token = auth.getAccessToken();

  console.log('Product API token:', token);

  // Temporary mock until backend is introduced.
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });

  return [
    {
      id: 1,
      name: 'Laptop',
      price: 75000,
    },
    {
      id: 2,
      name: 'Monitor',
      price: 25000,
    },
    {
      id: 3,
      name: 'Keyboard',
      price: 5000,
    },
  ];
}