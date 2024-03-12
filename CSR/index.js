const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

let products = [
  { id: 1, name: "Product 1", price: 10.99, rating: 4.5 },
  { id: 2, name: "Product 2", price: 19.99, rating: 3.8 },
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const { name, price, rating } = req.body;
  const newProduct = { id: products.length + 1, name, price, rating };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
