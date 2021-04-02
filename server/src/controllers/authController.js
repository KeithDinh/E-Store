const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );

  if (user) {
    res.status(200).json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    res.status(201).json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  await User.find({ email: req.user.email }).exec((error, user) => {
    if (error || user.length > 1) throw new Error(error);
    res.status(200).json(user);
  });
};
