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
      product: {},
      quantity: { type: Number, required: true }
    },
  ],
  wishlist: [],
  pushedProducts: [],
});

module.exports = mongoose.model("User", UserSchema);
