const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cart = new mongoose.Schema({
  products: [
    {
      product: {
        type: ObjectId,
        ref: "Product",
      },
      count: Number,
      color: String,
      price: Number,
    },
  ],
  cartTotal: Number,
  totalAfterDiscount: Number,
  orderBy: { type: ObjectId, ref: "User" },
});

module.exports = mongoose.model("Cart", cart);
