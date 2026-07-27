import { Route, Routes } from "react-router-dom";

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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route element={<AdminRoute />}>
        <Route path="/admin/products" element={<ProductManagementPage />} />
        <Route path="/admin/products/add" element={<AddProductPage />} />
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
