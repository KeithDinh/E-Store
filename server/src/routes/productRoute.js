const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

const {
  createProduct,
  getProducts,
} = require("../controllers/productController");

router.route("/product").post(authCheck, adminCheck, createProduct);
router.route("/products").get(getProducts);
module.exports = router;
