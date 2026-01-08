import Ribbon from "../../Components/Ribbon/Ribbon"
import HostsSidebar from "../../Components/Sidebar/HostsSidebar"
import { Routes, Route } from "react-router-dom";

import { routes } from "../routes"

export const MainWrapper = () => {
  
  return (
    <div >
      <Ribbon />
      <div className="flex">
        <HostsSidebar />
        <main className="flex-1">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  )
}