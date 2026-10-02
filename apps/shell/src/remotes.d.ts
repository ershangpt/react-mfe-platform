declare module 'product/ProductApp' {
  import type { ComponentType } from 'react';
  import type { AuthContract } from '@company/auth-contract';

  const ProductApp: ComponentType<{
    auth: AuthContract;
  }>;

  export default ProductApp;
}

declare module 'order/OrderApp' {
  import type { ComponentType } from 'react';

  const OrderApp: ComponentType;

  export default OrderApp;
}