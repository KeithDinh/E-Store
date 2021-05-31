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
} = require("../controllers/couponController");

// route
router.route("/coupon").post(authCheck, adminCheck, createCoupon);
router
  .route("/coupon/:slug")
  .get(getCoupon)
  .delete(authCheck, adminCheck, removeCoupon);

router.route("/coupons").get(getCoupons);

module.exports = router;
