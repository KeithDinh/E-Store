const Coupon = require("../models/coupon");
const slugify = require("slugify");

exports.createCoupon = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body;
    res.json(await new Coupon({ name, expiry, discount }).save());
  } catch (error) {
    console.log(error);
  }
};

exports.getCoupon = async (req, res) => {
  try {
    res.json(await Coupon.findOne({ name: req.params.name }).exec());
  } catch (error) {
    console.log(error);
  }
};

exports.removeCoupon = async (req, res) => {
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).save());
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
