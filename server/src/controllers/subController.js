const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    console.log(name, parent);

    res.status(201).json(
      await new Sub({
        name,
        slug: slugify(name),
        parent,
      }).save()
    );
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Failed to create new sub");
  }
};

exports.retrieve = async (req, res) => {
  res.status(200).json(await Sub.findOne({ slug: req.params.slug }).exec());
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      {
        name,
        slug: slugify(name),
        parent,
      },
      { new: true } // send the new updated to client instead of the old one
    );
    console.log(updated);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).send("Failed to update sub ");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Failed to update sub ");
  }
};

exports.getAll = async (req, res) => {
  res.status(200).json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};
