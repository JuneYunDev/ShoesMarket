import { createContext, useContext, useMemo, useState } from "react";

import { shoesData } from "../data/shoesData";

const ProductContext = createContext(null);

const STORAGE_KEY = "shoe-market-products";

const getInitialProducts = () => {
  try {
    const savedProducts = localStorage.getItem(STORAGE_KEY);

    if (savedProducts) {
      return JSON.parse(savedProducts);
    }
  } catch (error) {
    console.error("Failed to load saved products:", error);
  }

  return shoesData;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(getInitialProducts);

  const saveProducts = (nextProducts) => {
    setProducts(nextProducts);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
  };

  const addProduct = (productData) => {
    const existingIds = products
      .map((product) => Number(product.id))
      .filter((id) => Number.isFinite(id));

    const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

    const newProduct = {
      ...productData,
      id: nextId,
      createdAt: new Date().toISOString(),
    };

    saveProducts([...products, newProduct]);

    return newProduct;
  };

  const updateProduct = (productId, updatedProductData) => {
    const nextProducts = products.map((product) =>
      String(product.id) === String(productId)
        ? {
            ...product,
            ...updatedProductData,
            updatedAt: new Date().toISOString(),
          }
        : product,
    );

    saveProducts(nextProducts);
  };

  const deleteProduct = (productId) => {
    const nextProducts = products.filter(
      (product) => String(product.id) !== String(productId),
    );

    saveProducts(nextProducts);
  };

  const value = useMemo(
    () => ({
      products,
      addProduct,
      updateProduct,
      deleteProduct,
    }),
    [products],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider.");
  }

  return context;
};
