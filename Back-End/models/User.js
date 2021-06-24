const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  token: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  userType: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: { type: Number, required: true },
    },
  ],
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orders: [
    {
      orderValue: {
        type: Number,
        required: true,
      },
      orderDate: {
        type: String,
        required: true,
      },
      productList: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      orderId: {
        type: String,
        required: true,
      },
    },
  ],
  pushedProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
