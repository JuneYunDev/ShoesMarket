import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/homePage.jsx";
import ProductListPage from "./pages/productListPage/productListPage.jsx";
import ProductDetailPage from "./pages/productDetailPage/productDetailPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
