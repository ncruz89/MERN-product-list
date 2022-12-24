const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");

const app = express();

const DUMMY_PRODUCTS = []; // not a database, just some in-memory storage for now

app.use(bodyParser.json()); // automatically parse all request bodies as json

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// get products endpoint
// returns products array
app.get("/products", (req, res) => {
  res.status(200).json({ products: DUMMY_PRODUCTS });
});

// add products enpoint
app.post("/product", (req, res) => {
  const { title, price } = req.body;

  if (!title || title.trim().length === 0 || !price || price <= 0) {
    return res.status(422).json({
      message: "Invalid input, please enter a valid title and price.",
    });
  }

  // add generated id with uuid library to product
  // returns created product
  const createdProduct = {
    id: uuid(),
    title,
    price,
  };

  DUMMY_PRODUCTS.push(createdProduct);

  res
    .status(201)
    .json({ message: "Created new product.", product: createdProduct });
});

// delete product endpoint. matches id sent from client side to id in server side and removes product
//returns updated products array
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const index = DUMMY_PRODUCTS.findIndex((product) => product.id === id);
  DUMMY_PRODUCTS.splice(index, 1);

  res.status(200).json({ products: DUMMY_PRODUCTS });
});

app.listen(5000); // start Node + Express server on port 5000
