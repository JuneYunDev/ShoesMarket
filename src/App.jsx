import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/HomePage/homePage.jsx";
import ProductListPage from "./pages/productListPage/productListPage.jsx";
import ProductDetailPage from "./pages/productDetailPage/productDetailPage.jsx";
import LoginPage from "./pages/account/loginPage.jsx";
import SignUpPage from "./pages/account/signUpPage.jsx";
import ForgotPasswordPage from "./pages/account/forgotPasswordPage.jsx";
import ForgotEmailPage from "./pages/account/forgotEmailPage.jsx";
import CartPage from "./pages/CartPage/cartPage.jsx";
import CheckoutPage from "./pages/checkoutPage/checkoutPage.jsx";
import OrderCompletePage from "./pages/orderCompletePage/orderCompletePage.jsx";
import AdminRoute from "./routes/adminRoute.jsx";
import ProductManagementPage from "./pages/admin/productManagement.jsx";
import AddProductPage from "./pages/admin/addProductPage.jsx";
import EditProductPage from "./pages/admin/editProductPage.jsx";
import { supabase } from "./lib/supabase.js";
import { testSupabaseConnection } from "./services/testSupabaseConnection";

const App = () => {
  useEffect(() => {
    testSupabaseConnection();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route element={<AdminRoute />}>
        <Route path="/admin/products" element={<ProductManagementPage />} />
        <Route path="/admin/products/add" element={<AddProductPage />} />
        <Route
          path="/admin/products/:productId/edit"
          element={<EditProductPage />}
        />
      </Route>
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/forgot-email" element={<ForgotEmailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-complete" element={<OrderCompletePage />} />
    </Routes>
  );
};

export default App;
