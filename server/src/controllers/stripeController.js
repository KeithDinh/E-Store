const Coupon = require("../models/coupon");
const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const { cartTotal } = await Cart.findOne({ orderBy: user._id }).exec();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cartTotal * 100, // 100 cents, not dollar
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
