const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/add-product', productsController.getAddProduct);
router.get('/products', productsController.getAdminProducts);
router.post('/add-product', productsController.postAddProduct);
router.post('/products', productsController.postDeleteProduct);

module.exports = router;