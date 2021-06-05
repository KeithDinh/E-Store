const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Order = require("../models/order");

exports.getUserAddress = async (req, res) => {
  const { address } = await User.findOne({ email: req.user.email }).exec();

  if (address) {
    res.json({ address });
  } else {
    res.json({ address: "" });
  }
};
exports.userCart = async (req, res) => {
  const { cart } = req.body;
  const user = await User.findOne({ email: req.user.email }).exec();

  // remove existing cart in db
  let cartExistByThisUser = await Cart.findOne({ orderBy: user._id }).exec();
  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
  }

  let products = [];
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
  }).save();

  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOne({ orderBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  if (cart) {
    const { products, cartTotal, totalAfterDiscount } = cart;
    return res.json({ products, cartTotal, totalAfterDiscount });
  }
  res.json({ products: [], cartTotal: 0, totalAfterDiscount: 0 });
};

exports.emptyUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOneAndRemove({ orderBy: user._id }).exec();

  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};

// ORDER
exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.fineOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderBy: user._id }).exec();

  let newOrder = new Order({
    products,
    paymentIntent,
    orderBy: user._id,
  }).save();

  res.json({ ok: true });
};
