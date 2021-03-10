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
} = require("../controllers/categoryController");

// route

router.route("/category").post(authCheck, adminCheck, create);
router
  .route("/category/:slug")
  .get(authCheck, adminCheck, retrieve)
  .put(authCheck, adminCheck, update)
  .delete(authCheck, adminCheck, remove);

router.route("/categories").get(getAll);

module.exports = router;
