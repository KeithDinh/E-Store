const express = require("express");

const router = express.Router();

// from middlewares
const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

// from controller
const {
  create,
  retrieve,
  update,
  remove,
  getAll,
} = require("../controllers/subController");

// route
router.route("/sub").post(authCheck, adminCheck, create);
router
  .route("/sub/:slug")
  .get(retrieve)
  .put(authCheck, adminCheck, update)
  .delete(authCheck, adminCheck, remove);

router.route("/subs").get(getAll);

module.exports = router;
