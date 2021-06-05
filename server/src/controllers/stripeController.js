const Coupon = require("../models/coupon");
const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  const { couponApplied } = req.body;

  const user = await User.findOne({ email: req.user.email }).exec();

  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderBy: user._id,
  }).exec();

  let finalAmount = 0;

  finalAmount =
    couponApplied && totalAfterDiscount
      ? Math.round(totalAfterDiscount * 100)
      : Math.round(cartTotal * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount, // 100 cents, not dollar
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal, // total price before discount
    totalAfterDiscount, // total price after discount
    payable: finalAmount, // total price in cents after discount
  });
};
