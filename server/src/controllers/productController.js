const Product = require("../models/product");
const User = require("../models/user");
const Category = require("../models/category");
const Sub = require("../models/sub");

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
    (e) => JSON.stringify(e.postedBy) === JSON.stringify(user._id)
  );

  // if user never rates this product before
  if (existingRatingObject === undefined) {
    try {
      let ratingsAdded = await Product.findOneAndUpdate(
        { _id: product._id },
        {
          $push: { ratings: { star, postedBy: user._id } },
        },
        { new: true }
      ).exec();
      res.json(ratingsAdded);
    } catch (error) {
      console.log(error);
      return res.status(400).json("Can't rate");
    }
  } else {
    // if user rated it before, then we need to change it with new
    const ratingUpdated = await Product.updateOne(
      { ratings: { $elemMatch: existingRatingObject } },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();

    res.json(ratingUpdated);
  }
};

exports.getRelatedProducts = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subs")
    .populate("postedBy")
    .exec();

  res.json(related);
};

exports.getProductsByCategory = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ category })
    .populate("category")
    .populate("postedBy", "_id name")
    .exec();

  res.json({
    category,
    products,
  });
};

exports.getProductsBySub = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub })
    .populate("category")
    .populate("postedBy", "_id name")
    .exec();

  res.json({
    sub,
    products,
  });
};

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};
exports.searchProductByFilters = async (req, res) => {
  // destructure {query: text}
  const { query, price } = req.body;

  if (query) {
    console.log("query", query);
    await handleQuery(req, res, query);
  }

  // price [0, 20]
  if (price !== undefined) {
    await handlePrice(req, res, price);
  }
};
