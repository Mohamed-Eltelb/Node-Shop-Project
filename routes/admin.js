const express = require('express');
const path = require('path')
const router = express.Router();
const rootDir = require('../utils/path');

const products = []

router.get('/add-product',(req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {docTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true});
});

router.post('/add-product',(req, res, next) => {
    products.push({title: req.body.title})
    res.redirect('/');
});

exports.router = router;
exports.products = products;