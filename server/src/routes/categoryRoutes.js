const express = require("express");

const router = express.Router();

// from middlewares
const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

// from controller
const {
  createCategory,
  getCategory,
  updateCategory,
  removeCategory,
  getCategories,
  getSubs,
} = require("../controllers/categoryController");

// route

router.route("/category").post(authCheck, adminCheck, createCategory);
router
  .route("/category/:slug")
  .get(getCategory)
  .put(authCheck, adminCheck, updateCategory)
  .delete(authCheck, adminCheck, removeCategory);

router.route("/categories").get(getCategories);
router.route("/category/subs/:_id").get(getSubs);
module.exports = router;
