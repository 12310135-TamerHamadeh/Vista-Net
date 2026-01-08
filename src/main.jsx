import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HostsProvider } from "./context/HostsContext.jsx";
import "./Styles/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HostsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HostsProvider>
  </StrictMode>
);
