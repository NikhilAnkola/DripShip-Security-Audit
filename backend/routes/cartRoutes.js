const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const verifyToken = require("../middleware/verifyToken"); 

//  Add item to cart
router.post("/add", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const alreadyInCart = user.cart.some(
      (item) => item.productId.toString() === productId
    );
    if (alreadyInCart)
      return res.status(400).json({ message: "Product already in cart" });

    user.cart.push({ productId });
    await user.save();

    res.json({ message: "Product added to cart successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//  Get all cart items
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.productId");
    res.json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//  Remove item from cart
router.delete("/remove/:productId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== req.params.productId
    );
    await user.save();
    res.json({ message: "Product removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
