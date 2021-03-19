const Product = require("../models/product");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    console.log(req.body);
    res.status(201).json(await new Product(req.body).save());
  } catch (error) {
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  res.status(200).json(await Product.find({}).sort({ createdAt: -1 }).exec());
};
