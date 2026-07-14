import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage.jsx";
import ProductListPage from "./pages/ProductListPage/ProductListPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
