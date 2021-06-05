const Coupon = require("../models/coupon");
const User = require("../models/user");
const Cart = require("../models/cart");

exports.createCoupon = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body.coupon;
    res.json(await new Coupon({ name, expiry, discount }).save());
  } catch (error) {
    console.log(error);
  }
};

exports.getCoupon = async (req, res) => {
  try {
    res.json(await Coupon.findById(req.params.couponId).exec());
  } catch (error) {
    console.log(error);
  }
};

exports.removeCoupon = async (req, res) => {
  try {
    console.log(req.params.couponId);
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
  } catch (error) {
    console.log(error);
  }
};

exports.getCoupons = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createAt: -1 }).exec());
  } catch (error) {
    console.log(error);
  }
};

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();

  if (validCoupon === null)
    return res.json({
      err: "Invalid Coupon",
    });

  const user = await User.findOne({ email: req.user.email }).exec();
  let { products, cartTotal } = await Cart.findOne({
    orderBy: user._id,
  })
    .populate("products.product", "_id title price")
    .exec();

  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  await Cart.findOneAndUpdate(
    { orderBy: user._id },
    { totalAfterDiscount },
    { new: true }
  );

  res.json(totalAfterDiscount);
};
