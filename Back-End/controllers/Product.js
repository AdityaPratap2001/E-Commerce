const Product = require("../models/Product");

exports.addProduct = (req,res,next) => {
  console.log(req.body)
  console.log(req.file);
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    brand: req.body.seller,
    category: req.body.category,
    subCategory: req.body.subCategory,
    fit: req.body.fit,
    material: req.body.material,
    productType: req.body.prodType,
    // sellerId: ,
    // image: ,
  })
  newProduct.save();
  return res.status(200).send('Product uploaded successfully!');
}