import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { useDarkModeStore } from "./hooks/useDarkModeStore";

// Initialize dark mode theme before render
useDarkModeStore.getState().init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
