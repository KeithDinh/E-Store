const express = require("express");

const router = express.Router();

// from middlewares
const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

// from controller
const {
  createSub,
  getSub,
  updateSub,
  removeSub,
  getSubs,
} = require("../controllers/subController");

// route
router.route("/sub").post(authCheck, adminCheck, createSub);
router
  .route("/sub/:slug")
  .get(getSub)
  .put(authCheck, adminCheck, updateSub)
  .delete(authCheck, adminCheck, removeSub);

router.route("/subs").get(getSubs);

module.exports = router;
