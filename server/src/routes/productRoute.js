const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

const { create } = require("../controllers/productController");

router.post("/product", authCheck, adminCheck, create);

module.exports = router;
