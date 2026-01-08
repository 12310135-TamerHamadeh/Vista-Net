import { IsLoggedInGuard } from "./route-guards/IsLoggedIn.guard.jsx";
import { Login, Dashboard, Settings } from "../Pages/index.jsx";

export const routes = [
  {
    path: "/dashboard",
    element: (
      // <IsLoggedInGuard>
        <Dashboard />
      /* </IsLoggedInGuard> */
    ),
  },
  {
    path: "/login",
    element: (
        <Login />
    )
  },
  {
    path: "/settings",
    element: (
      <Settings />
    )
  },
  {
    path: "/*",
    element: (
      <div>404 Not Found</div>
    )
  }
];
