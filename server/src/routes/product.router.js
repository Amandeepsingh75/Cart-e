const product = require('../controllers/productController.js')
const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multer.middleware.js')
const CheckUserLoginOrNot = require("../middlewares/authCheck.middleware.js");


router
  .route("/add-product")
  .post(CheckUserLoginOrNot, upload.single("productImage"), product.addProduct);
router.route('/get-products').get(product.getAllProducts)
router.route("/get-product-with-id").get(product.getSingleProductDetail);


module.exports =router