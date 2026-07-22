import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/cartContext";
import { AccountProvider } from "./context/accountContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AccountProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AccountProvider>
  </StrictMode>,
);
