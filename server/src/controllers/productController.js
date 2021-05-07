const Product = require("../models/product");
const User = require("../models/user");

const slugify = require("slugify");
const cloudinary = require("cloudinary");

exports.getProduct = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
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
exports.updateProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();

    res.json(updated);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Product update failed!");
  }
};
exports.getProductsCondition = async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const itemPerPage = 3;

    const products = await Product.find({})
      .skip((currentPage - 1) * itemPerPage)
      .limit(itemPerPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).send("");
  }
};

exports.productCount = async (req, res) => {
  res.json(await Product.find({}).estimatedDocumentCount().exec());
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  // check if user has rated this product
  let existingRatingObject = product.ratings.find(
    (e) => e.postedBy === user.id
  );

  // if user never rates this product before
  if (existingRatingObject === undefined) {
    let ratingsAdded = await Product.findOneAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();

    res.json(ratingsAdded);
  } else {
    // if user rated it before
    const ratingUpdated = await Product.updateOne(
      { ratings: { $elemMatch: existingRatingObject } },
      { $set: { "ratings.$.satr": star } },
      { new: true }
    ).exec();

    res.json(ratingUpdated);
  }
};
