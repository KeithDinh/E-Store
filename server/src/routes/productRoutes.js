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
  productCount,
  productStar,
  getRelatedProducts,
} = require("../controllers/productController");

router.route("/product").post(authCheck, adminCheck, createProduct);
router.route("/products/total").get(productCount);

router.route("/products/:count").get(getProducts);
router
  .route("/product/:slug")
  .delete(authCheck, adminCheck, removeProduct)
  .get(getProduct)
  .put(authCheck, adminCheck, updateProduct);

router.route("/products").post(getProductsCondition);
router.route("/product/star/:productId").put(authCheck, productStar);
router.route("/product/related/:productId").get(getRelatedProducts);
module.exports = router;
