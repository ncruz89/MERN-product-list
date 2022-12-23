import React from "react";
import Button from "../Button/Button";

import "./ProductItem.css";

const ProductItem = (props) => {
  removeProductHandler = () => {};

  return (
    <div className="product-item-container">
      <li className="product-item">
        <h2>{props.name}</h2>
        <p>Price: ${props.price}</p>
      </li>
      <Button onClick={removeProductHandler}>Remove</Button>
    </div>
  );
};

export default ProductItem;
