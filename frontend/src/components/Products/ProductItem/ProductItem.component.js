import React, { useContext } from "react";
import Button from "../../Button/Button.component";

import "./ProductItem.styles.css";

import { ProductsContext } from "../../../contexts/products.context";

const ProductItem = ({ name, price, id }) => {
  const { removeProductFromList } = useContext(ProductsContext);

  const removeProductHandler = () => {
    removeProductFromList(id);
  };
  return (
    <div className="product-item-container">
      <li className="product-item">
        <h2>{name}</h2>
        <p>Price: ${price}</p>
      </li>
      <Button type="button" onClick={removeProductHandler}>
        Remove
      </Button>
    </div>
  );
};

export default ProductItem;
