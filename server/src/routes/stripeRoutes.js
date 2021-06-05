const express = require("express");

const router = express.Router();

const { createPaymentIntent } = require("../controllers/stripeController");

const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

router.route("/create-payment-intent").post(authCheck, createPaymentIntent);

module.exports = router;
