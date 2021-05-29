const express = require("express");

const router = express.Router();

// from middlewares
const { authCheck } = require("../middlewares/authMiddlewares");

const {
  userCart,
  getUserCart,
  emptyUserCart,
  saveAddress,
} = require("../controllers/userController");

router
  .route("/user/cart")
  .post(authCheck, userCart)
  .get(authCheck, getUserCart)
  .put(authCheck, emptyUserCart);

router.route("/user/address").post(authCheck, saveAddress);

module.exports = router;
