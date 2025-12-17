import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./style.css";

const container = document.getElementById("app");

if (!container) {
  throw new Error("Root container missing");
}

createRoot(container).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
