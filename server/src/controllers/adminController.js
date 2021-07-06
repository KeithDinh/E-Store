const order = require("../models/order");
const Order = require("../models/order");

exports.getOrders = async (req, res) => {
  let orders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();

  res.json(orders);
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  let updated = await order
    .findByIdAndUpdate(orderId, { orderStatus }, { new: true })
    .exec();

  res.json(updated);
};