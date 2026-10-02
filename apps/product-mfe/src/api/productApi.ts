//import { createApiClient } from '@company/api-client';
import { getAuth } from '../auth/auth';

//import { getRuntimeConfig } from '@company/runtime-config';

//const config = getRuntimeConfig();

export type Product = {
  id: number;
  name: string;
  price: number;
};

// const apiClient = createApiClient({
//   baseUrl: config.API_BASE_URL,
//   getAccessToken: () =>
//     getAuth().getAccessToken(),
// });

export async function getProducts(): Promise<Product[]> {
  const auth = getAuth();

  if (!auth.isAuthenticated()) {
    throw new Error('User is not authenticated');
  }

  console.log(
    'Product API token:',
    auth.getAccessToken(),
  );

  // Temporary mock API.
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