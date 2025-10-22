const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "Shop",
      path: "/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      docTitle: "Admin Products",
      path: "/admin/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getCart = (req, res, next) => {
  Product.fetchAllCart((cartItems) => {
    res.render("shop/cart", {
      docTitle: "Your Cart",
      path: "/cart",
      hasProducts: cartItems.length > 0,
      cartItems: cartItems,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      docTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = parseInt(req.body.productId, 10);
  Product.deleteById(prodId);
  res.redirect("/admin/products");
}

exports.postAddToCart = (req, res, next) => {
  const prodId = parseInt(req.body.productId, 10);
  Product.addToCart(prodId);
  res.redirect("/cart");
}

exports.postRemoveFromCart = (req, res, next) => {
  const prodId = parseInt(req.body.productId, 10);
  Product.removeFromCart(prodId);
  res.redirect("/cart");
}

exports.getProduct = (req, res, next) => {
  const prodId = parseInt(req.params.productId, 10);
  Product.fetchAll((products) => {
    const product = products.find(p => p.id === prodId);
    if (product) {
      res.render("shop/product-detail", {
        product: product,
        docTitle: product.title,
        path: "/product-detail",
      });
    } else {
      res.redirect("/");
    }
  });
};