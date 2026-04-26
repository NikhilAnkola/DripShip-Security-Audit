const express = require("express");
const Product = require("../models/Product.js");

const router = express.Router();

//  GET /api/products — fetch all products from MongoDB
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // fetch all docs
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error while fetching products" });
  }
});

//  GET /api/products/:id — fetch a single product by its MongoDB _id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: "Server error while fetching product" });
  }
});

module.exports = router;
