import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/cartContext";
import { AccountProvider } from "./context/accountContext";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AccountProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AccountProvider>
    </BrowserRouter>
  </StrictMode>,
);
