const Product = require("../models/product");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    res.status(201).json(await new Product(req.body).save());
  } catch (error) {
    res.status(400).send("Failed to create new product");
  }
};

exports.getProducts = async (req, res) => {
  res.status(200).json(await Product.find({}).sort({ createdAt: -1 }).exec());
};
