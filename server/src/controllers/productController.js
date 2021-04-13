const Product = require("../models/product");
const slugify = require("slugify");
const cloudinary = require("cloudinary");

exports.getProduct = async (req, res) => {
  const product = await (await Product.findOne({ slug: req.params.slug }))
    .populated("category")
    .populate("subs")
    .exec();
  res.json(product);
};

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

exports.removeProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      slug: req.params.slug,
    }).exec();

    // remove product images on Cloudinary
    deleted.images.map(async (img) => {
      await cloudinary.v2.uploader.destroy(
        img.public_id,
        function (error, result) {
          if (error)
            return res.json({
              success: false,
              error: error.message,
              deleted: deleted,
            });
        }
      );
    });

    res.json(deleted);
  } catch (error) {
    return res.status(400).send("Can't remove the product!");
  }
};
