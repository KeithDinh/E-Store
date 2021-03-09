const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

// controller
const {
  createOrUpdateUser,
  currentUser,
} = require("../controllers/authController");

router.route("/create-or-update-user").post(authCheck, createOrUpdateUser);

router.route("/current-user").get(authCheck, currentUser);

router.route("/current-admin").get(authCheck, adminCheck, currentUser);

module.exports = router;
