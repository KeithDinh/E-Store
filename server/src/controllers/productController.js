const Product = require("../models/product");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    console.log(req.body);
    res.status(201).json(await new Product(req.body).save());
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};
