const express = require("express");

const router = express.Router();

// from middlewares
const { authCheck } = require("../middlewares/authMiddlewares");

const { userCart } = require("../controllers/userController");

router.route("/user/cart").post(authCheck, userCart);

module.exports = router;
