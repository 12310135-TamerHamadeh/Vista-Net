import Ribbon from "../../Components/Ribbon/Ribbon";
import HostsSidebar from "../../Components/Sidebar/HostsSidebar";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { routes } from "../routes";

export const MainWrapper = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const location = useLocation();

  const publicRoutes = ["/login"];

  const isPublicRoute = publicRoutes.includes(location.pathname);

  // if (!isLoggedIn && !isPublicRoute) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div>
      <Ribbon />
      <div className="flex">
        <HostsSidebar />
        <main className="flex-1">
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  );
};
