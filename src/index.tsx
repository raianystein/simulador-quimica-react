import ReactDOM from "react-dom/client";
import React from "react";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes.tsx";
import MyContext, { MyProvider } from "./contexts/MyContext.tsx";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
  <BrowserRouter>
    <MyProvider>
      <AppRoutes/>
    </MyProvider>
  </BrowserRouter>
);