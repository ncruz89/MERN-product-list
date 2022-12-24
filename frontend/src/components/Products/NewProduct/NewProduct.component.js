import React, { useState, useContext } from "react";

import Input from "../../Input/Input.component";
import Button from "../../Button/Button.component";
import "./NewProduct.styles.css";

import { ProductsContext } from "../../../contexts/products.context";

// product component
// retrieves product info and adds product to PRODUCTS array
const NewProduct = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");

  const { addProductToList } = useContext(ProductsContext);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);
  };

  const submitProductHandler = (event) => {
    event.preventDefault();
    if (!enteredTitle || !enteredPrice) return;
    addProductToList(enteredTitle, enteredPrice);
    setEnteredTitle("");
    setEnteredPrice("");
  };

  return (
    <section id="new-product">
      <h2>Add a New Product</h2>
      <form onSubmit={submitProductHandler}>
        <Input
          type="text"
          label="Title"
          id="title"
          minLength={3}
          required={true}
          value={enteredTitle}
          onChange={titleChangeHandler}
        />
        <Input
          type="number"
          label="Price"
          step={0.01}
          required={true}
          id="price"
          value={enteredPrice}
          onChange={priceChangeHandler}
        />
        <Button type="submit">ADD PRODUCT</Button>
      </form>
    </section>
  );
};

export default NewProduct;
