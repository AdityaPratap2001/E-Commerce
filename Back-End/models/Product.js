const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  
  productName: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model("Product", UserSchema);
