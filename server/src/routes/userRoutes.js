const express = require("express");

const router = express.Router();

// from middlewares
const { authCheck } = require("../middlewares/authMiddlewares");

const { userCart, getUserCart } = require("../controllers/userController");

router
  .route("/user/cart")
  .post(authCheck, userCart)
  .get(authCheck, getUserCart);

module.exports = router;
