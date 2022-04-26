const OrderModel = require('../model/OrderModel');
const Language = require('../utils/Language');
const MiddlewareError = require('../utils/MiddlewareError');

/**
 * Get all orders from database
 */
async function getOrders(req, res, next) {
  try {
    // Check is admin or not

    // Not signed in or not an admin user
    if (!req.userData || !req.userData.admin) {
      return next(new MiddlewareError(401, Language.Response.Unauthorized));
    }

    const orders = await OrderModel.find({});
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
}

async function getUserOrder(req, res, next) {
  try {
    // Not signed in or not an admin user
    if (!req.userData || !req.userData.admin) {
      return next(new MiddlewareError(401, Language.Response.Unauthorized));
    }
    const { _id } = req.userData;
    const orders = await OrderModel.find({ user: _id }).populate({
      path: 'products.product',
      populate: 'thumbnail',
    });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
}

async function createOrder(req, res, next) {
  try {
    const { address, phone, name, products } = req.body;
    // Field checker
    if (!(address && phone && name && products)) {
      return next(
        new MiddlewareError(400, Language.Response.FieldNotFoundOrEmpty),
      );
    }

    // Create order
    const order = new OrderModel({
      address,
      phone,
      name,
      products,
      user: req.userData?._id,
    });
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    return next(err);
  }
}

async function updateOrder(req, res, next) {
  try {
    const { id } = req.params;

    // Order not found
    if (!(await OrderModel.findOne({ _id: id }))) {
      throw new MiddlewareError(404, Language.Response.OrderNotFound);
    }

    const { status } = req.body;

    const order = await OrderModel.findByIdAndUpdate(id, {
      status,
    });

    res.json(order);
  } catch (err) {
    return next(err);
  }
}

/**
 * Delete the order by using parameter id.
 */
async function deleteOrder(req, res, next) {
  try {
    const { id } = req.params;
    const orderExist = OrderModel.findOne({ _id: id });

    // If not existed
    if (!orderExist) {
      return next(new MiddlewareError(404, Language.Response.OrderNotFound));
    }

    // Check is admin or not
    if (!req.userData || !req.userData.admin) {
      return next(new MiddlewareError(401, Language.Response.Unauthorized));
    }

    // Delete order
    await OrderModel.deleteOne({ _id: id });
    res.status(200).json({ message: Language.Response.OrderDeleted });
  } catch (err) {
    return next(err);
  }
}

const OrderController = {
  getOrders,
  getUserOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};

module.exports = OrderController;
