const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/authMiddlewares");

// controller
const { createOrUpdateUser } = require("../controllers/authController");

router
  .route("/create-or-update-user")
  .post(authCheck, createOrUpdateUser)
  .get(authCheck, createOrUpdateUser);

module.exports = router;
