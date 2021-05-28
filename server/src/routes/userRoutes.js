const express = require("express");

const router = express.Router();

// from middlewares
const { authCheck } = require("../middlewares/authMiddlewares");

const {
  userCart,
  getUserCart,
  emptyUserCart,
} = require("../controllers/userController");

router
  .route("/user/cart")
  .post(authCheck, userCart)
  .get(authCheck, getUserCart)
  .put(authCheck, emptyUserCart);

module.exports = router;
