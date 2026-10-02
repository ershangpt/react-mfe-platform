import ProductProviders from './providers/ProductProviders';
import { ProductApp } from './ProductApp';
import type { AuthContract } from '@company/auth-contract';
import { configureAuth } from './auth/auth';

type ProductRootProps = {
  auth: AuthContract;
};


export default function ProductRoot({ auth }: ProductRootProps) {
  configureAuth(auth);
  
  return (
    <ProductProviders>
      <ProductApp />
    </ProductProviders>
  );
}