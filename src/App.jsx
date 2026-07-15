import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/homePage.jsx";
import ProductListPage from "./pages/productListPage/productListPage.jsx";
import ProductDetailPage from "./pages/productDetailPage/productDetailPage.jsx";
import LoginPage from "./pages/account/loginPage.jsx";
import SignUpPage from "./pages/account/signUpPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
