import React, { useContext } from "react";

import ProductItem from "../ProductItem/ProductItem.component";
import "./ProductList.styles.css";

import { ProductsContext } from "../../../contexts/products.context";

// product list component
// maps and renders products if PRODUCTS array exists else displays <p> text
const ProductList = () => {
  const { loadedProducts } = useContext(ProductsContext);

  return (
    <section id="products">
      {loadedProducts.length ? (
        <ul className="product-list">
          {loadedProducts.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
            />
          ))}
        </ul>
      ) : (
        <p>Could not find any products. Please add a product.</p>
      )}
    </section>
  );
};

export default ProductList;
