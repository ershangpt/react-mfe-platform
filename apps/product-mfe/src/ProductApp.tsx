import { useCurrentUser } from './hooks/useCurrentUser';
import { useProducts } from './hooks/useProducts';

export function ProductApp() {
  const {
    data: products,
    isPending,
    isError,
    error,
  } = useProducts();
  const user = useCurrentUser();

  if (isPending) {
    return <div>Loading products...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!products) {
    return <div>No products available.</div>;
  }

  return (
    <div>
      <h1>Products</h1>

      <div>
        Current User:{' '}
        {user ? user.name : 'No user'}
      </div>

      <div>
        Tenant:{' '}
        {user ? user.tenant : 'No tenant'}
      </div>

      {products.map((product) => (
        <div key={product.id}>
          {product.name} - ₹{product.price}
        </div>
      ))}
    </div>
  );
}