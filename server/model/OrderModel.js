const mongoose = require("mongoose");
const ProductModel = require("../model/ProductModel");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      warrantyDue: {
        type: Date,
        // required: true,
      },
      _id: false,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
});

OrderSchema.pre("save", async function (next) {
  if (!this.isModified("products")) {
    return next();
  }

  const products = this.products;
  let totalPrice = 0;

  for (let i = 0; i < products.length; i++) {
    const product = await ProductModel.findById(products[i].product);
    if (!product) {
      return next(new Error("Product not found"));
    }
    totalPrice += product.price * products[i].quantity;
  }

  for (let i = 0; i < products.length; i++) {
    const product = await ProductModel.findById(products[i].product);
    if (!product) {
      return next(new Error("Product not found"));
    }
    const currentDate = this.createdAt;
    currentDate.setMonth(currentDate.getMonth() + product.warrantyDuration);

    products[i].warrantyDue = currentDate;
  }

  this.totalPrice = totalPrice;
  next();
});

module.exports =
  mongoose.models.OrderSchema || mongoose.model("Order", OrderSchema);
