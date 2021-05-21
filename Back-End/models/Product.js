const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  fit: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  productType: {
    type: String,
    required: true
  },
  // sellerId:{
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  // image: {
  //   type: String,
  //   required: true
  // }

});

module.exports = mongoose.model("Product", ProductSchema);
