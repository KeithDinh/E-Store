const Category = require("../models/category");
const Sub = require("../models/sub");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    const category = await new Category({
      name: req.body.name,
      slug: slugify(req.body.name),
    }).save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).send("Failed to create new category");
  }
};
exports.getCategory = async (req, res) => {
  res
    .status(200)
    .json(await Category.findOne({ slug: req.params.slug }).exec());
};
exports.updateCategory = async (req, res) => {
  await Category.findOneAndUpdate(
    { slug: req.params.slug },
    { name: req.body.name, slug: slugify(req.body.name) },
    { new: true } // send the new updated to client instead of the old one
  ).exec((error, result) => {
    if (error) {
      res.status(400).send("Failed to update category ");
    } else {
      res.json(result);
    }
  });
};
exports.removeCategory = async (req, res) => {
  await Category.findOneAndDelete({ slug: req.params.slug }).exec(
    (error, result) => {
      if (error) {
        res.status(400).send("Failed to remove category");
      } else {
        res.json(result);
      }
    }
  );
};
exports.getCategories = async (req, res) => {
  res.status(200).json(await Category.find({}).sort({ createdAt: -1 }).exec());
};

exports.getSubs = async (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
