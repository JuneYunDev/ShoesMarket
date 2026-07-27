import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/cartContext";
import { AccountProvider } from "./context/accountContext";
import { ProductProvider } from "./context/productContext";

import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AccountProvider>
        <ProductProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider>
      </AccountProvider>
    </BrowserRouter>
  </StrictMode>,
);
