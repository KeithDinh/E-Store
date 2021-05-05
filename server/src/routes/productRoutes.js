const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

const {
  createProduct,
  getProducts,
  removeProduct,
  getProduct,
  updateProduct,
  getProductsCondition,
} = require("../controllers/productController");

router.route("/product").post(authCheck, adminCheck, createProduct);
router.route("/products/:count").get(getProducts);
router
  .route("/product/:slug")
  .delete(authCheck, adminCheck, removeProduct)
  .get(getProduct)
  .put(authCheck, adminCheck, updateProduct);

router.route("/products").post(getProductsCondition);
module.exports = router;
