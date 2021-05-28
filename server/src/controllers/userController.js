const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.userCart = async (req, res) => {
  const { cart } = req.body;
  let products = [];

  const user = await User.find({ email: req.user.email }).exec();

  // remove existing cart in db
  let cartExistByThisUser = await Cart.findOne({ orderBy: user._id }).exec();
  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let { price } = await Product.findById(cart[i]._id).select("price").exec();

    let object = {
      product: cart[i]._id,
      count: cart[i].count,
      color: cart[i].color,
      price,
    };

    products.push(object);
  }
  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal += products[i].price * products[i].count;
  }

  let newCart = await new Cart({
    products,
    cartTotal,
    orderBy: user._id,
  });

  res.json({ ok: true });
};
