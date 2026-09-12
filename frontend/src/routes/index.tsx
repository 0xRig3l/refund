import { RouterProvider, createBrowserRouter } from "react-router";

import { authRoutes } from "./authRoutes";
import { employeeRoutes } from "./employeeRoutes";
import { managerRoutes } from "./managerRoutes";
import { useAuth } from "../hooks/useAuth";
import { useMemo } from "react";

export function Routes() {
  const authContext = useAuth();

  const router = useMemo(() => {
    const routes = (() => {
      switch (authContext.session?.user.role) {
        case "employee":
          return employeeRoutes;
        case "manager":
          return managerRoutes;
        default:
          return authRoutes;
      }
    })();

    return createBrowserRouter(routes);
  }, [authContext.session?.user.role]);

  if (authContext.isLoadingSession) {
    return null;
  }
  return <RouterProvider router={router} />;
}
