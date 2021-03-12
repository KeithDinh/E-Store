const express = require("express");

const router = express.Router();

// from middlewares
const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

// from controller
const {
  createOrUpdateUser,
  currentUser,
} = require("../controllers/authController");

// route
router.route("/create-or-update-user").post(authCheck, createOrUpdateUser);

router.route("/current-user").get(authCheck, currentUser);

router.route("/current-admin").get(authCheck, adminCheck, currentUser);

module.exports = router;
