import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ErrorBoundary } from "./../components/ErrorBoundary";
import { useAppStore } from "./../store/appStore";
import { publishUserChanged } from "./../events/eventBus";
import { login } from "../auth/authService";
import { useAuthStore } from "../auth/authStore";
import { logout } from "../auth/authService";
import { authContract } from "../auth/authContract";

import { loadRemote } from '@module-federation/enhanced/runtime';

const ProductApp = lazy(
  () => loadRemote('product/ProductApp') as Promise<any>
);
const OrderApp = lazy(() => import("order/OrderApp"));

function ProductRoute() {
  return (
    <ErrorBoundary
      fallback={
        <div>
          <h2>Product service unavailable</h2>
          <p>Please try again later.</p>
        </div>
      }
    >
      <Suspense fallback={<div>Loading Products...</div>}>
        <ProductApp auth={authContract}/>
      </Suspense>
    </ErrorBoundary>
  );
}

function OrderRoute() {
  return (
    <ErrorBoundary
      fallback={
        <div>
          <h2>Order service unavailable</h2>
          <p>Please try again later.</p>
        </div>
      }
    >
      <Suspense fallback={<div>Loading Orders...</div>}>
        <OrderApp />
      </Suspense>
    </ErrorBoundary>
  );
}

export default function AppRoutes() {
  const user = useAuthStore((state) => state.user);
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    if (!user) {
      return;
    }
    console.log("Publishing user changed event:", user);
    publishUserChanged({
      id: user.id,
      name: user.name,
      tenant: "acme",
    });
  }, [user]);

  

  const setAuthenticatedUser = useAuthStore(
    (state) => state.setAuthenticatedUser,
  );

  const handleLogin = () => {
    const session = login({
      id: "101",
      name: "Shasha",
      email: "shasha@example.com",
    });

    setAuthenticatedUser(session.user);
  };

  const clearAuthentication = useAuthStore(
    (state) => state.clearAuthentication,
  );
  const handleLogout = () => {
    logout();
    clearAuthentication();
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Enterprise Commerce Portal</h1>
            <div>User: {user?.name ?? "Guest"}</div>

            <div>Theme: {theme}</div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/products">Go to Products</Link>
            <Link to="/orders">Go to Orders</Link>
          </>
        }
      />

      <Route path="/products/*" element={<ProductRoute />} />

      <Route path="/orders/*" element={<OrderRoute />} />
    </Routes>
  );
}
