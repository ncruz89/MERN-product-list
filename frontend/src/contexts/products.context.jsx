import { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext({
  loadedProducts: [],
});

export const CategoriesProvider = ({ children }) => {
  const [loadedProducts, setLoadedProducts] = useState([]);

  const value = { loadedProducts };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
