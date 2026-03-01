import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppRoute from "./core/router/appRoute.js";
import { SocketProvider } from "./core/socket/SocketProvider.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <AppRoute />
    </SocketProvider>
  </StrictMode>,
);
