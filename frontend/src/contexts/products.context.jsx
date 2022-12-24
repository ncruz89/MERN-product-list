import React, { createContext, useState } from "react";

// business logic for products provider

/**addProduct
 * creates new product object and sends request to server to post product
 *
 * @param {array} loadedProducts
 * @param {string} productName
 * @param {string} productPrice
 * @returns updated products array
 */
const addProduct = async (loadedProducts, productName, productPrice) => {
  try {
    const newProduct = {
      title: productName,
      price: +productPrice, // "+" to convert string to number
    };
    let hasError = false;
    const response = await fetch("http://localhost:5000/product", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      hasError = true;
    }

    const responseData = await response.json();
    const id = responseData.product.id;

    if (hasError) {
      throw new Error(responseData.message);
    }

    return [...loadedProducts, { ...newProduct, id }];
  } catch (error) {
    alert(error.message || "Something went wrong!");
  }
};

/** removeProduct
 * sends delete request to server
 * deletes by id
 *
 * @param {string} id
 * @returns updated products array
 */
const removeProduct = async (id) => {
  try {
    let hasError = false;
    const response = await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      hasError = true;
    }

    const responseData = await response.json();
    if (hasError) {
      throw new Error(responseData.message);
    }
    return [...responseData.products];
  } catch (error) {
    alert(error.message || "Something went wrong!");
  }
};

// products context boilerplate
export const ProductsContext = createContext({
  loadedProducts: [],
  setLoadedProducts: () => {},
  isLoading: false,
  setIsLoading: () => {},
  addProductToList: () => {},
  removeProductFromList: () => {},
});

// product provider
// all business logic above
//provider simply calls setLoadedProducts to update products array
// isLoading state simply for user experience during products fetch

export const ProductProvider = ({ children }) => {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addProductToList = async (productName, productPrice) => {
    setLoadedProducts(
      await addProduct(loadedProducts, productName, productPrice)
    );
  };

  const removeProductFromList = async (id) => {
    setLoadedProducts(await removeProduct(id));
  };

  // additional context boilerplate
  const value = {
    loadedProducts,
    setLoadedProducts,
    isLoading,
    setIsLoading,
    addProductToList,
    removeProductFromList,
  };

  // provider component used in index.js
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
