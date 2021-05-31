const express = require("express");

const router = express.Router();

// from middlewares
const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

// from controller
const {
  createCoupon,
  getCoupon,
  removeCoupon,
  getCoupons,
  applyCouponToUserCart,
} = require("../controllers/couponController");

// route
router.route("/coupon").post(authCheck, adminCheck, createCoupon);
router
  .route("/coupon/:couponId")
  .get(getCoupon)
  .delete(authCheck, adminCheck, removeCoupon);

router.route("/coupons").get(getCoupons);

router.route("user/cart/coupon").post(authCheck, applyCouponToUserCart);

module.exports = router;
