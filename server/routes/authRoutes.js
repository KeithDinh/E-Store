const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/authMiddlewares");

// controller
const {
  createOrUpdateUser,
  currentUser,
} = require("../controllers/authController");

router
  .route("/create-or-update-user")
  .post(authCheck, createOrUpdateUser)
  .get(authCheck, createOrUpdateUser);

router.route("/current-user").get(authCheck, currentUser);

module.exports = router;
