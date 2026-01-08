import { Navigate, useLocation } from "react-router-dom";

/**
 * Route Guard: IsLoggedIn
 *
 * Responsibility:
 * - Protect routes that require authentication
 * - Redirect unauthenticated users to /auth/login
 */

export function IsLoggedInGuard({ children }) {

  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  const authPages = ["/login", "/signup", "/"];
  const isAuthPage = authPages.includes(location.pathname);


  if (isAuthenticated && isAuthPage) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }



  return children;
}
