const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
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
exports.retrieve = async (req, res) => {
  res
    .status(200)
    .json(await Category.findOne({ slug: req.params.slug }).exec());
};
exports.update = async (req, res) => {
  await Category.findOneAndUpdate(
    { slug: req.params.slug },
    { name: req.body.name, slug: slugify(req.body.name) },
    { new: true } // send the new updated to client instead of the old one
  ).exec((error, result) => {
    if (error) {
      res.status(400).send("Failed to update category");
    } else {
      res.json(result);
    }
  });
};
exports.remove = async (req, res) => {
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
exports.getAll = async (req, res) => {
  res.status(200).json(await Category.find({}).sort({ createdAt: -1 }).exec());
};
