import React, { useContext, useEffect, Fragment } from "react";

import Header from "./components/Header/Header.component";
import NewProduct from "./components/Products/NewProduct/NewProduct.component";
import ProductList from "./components/Products/ProductList/ProductList.component.";
import "./App.css";

import { ProductsContext } from "./contexts/products.context";

function App() {
  const { isLoading, setIsLoading, setLoadedProducts } =
    useContext(ProductsContext);

  // requests products array on initial render
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/products");

      const responseData = await response.json();

      setLoadedProducts(responseData.products);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <Fragment>
      <Header />
      <main>
        <NewProduct />
        {isLoading && <p className="loader">Loading...</p>}
        {!isLoading && <ProductList />}
      </main>
    </Fragment>
  );
}

export default App;
