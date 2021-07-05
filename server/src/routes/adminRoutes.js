const express = require("express");

const router = express.Router();

// from middlewares
const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

// from controller
const {
  getOrders,
  updateOrderStatus,
} = require("../controllers/adminController");

// route
router.route("/admin/orders").get(authCheck, adminCheck, getOrders);
router
  .route("/admin/order-status")
  .put(authCheck, adminCheck, updateOrderStatus);

module.exports = router;
