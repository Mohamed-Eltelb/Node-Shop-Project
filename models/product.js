const fs = require("fs");
const path = require("path");
const currentDir = require("../utils/path");
const { get } = require("http");

const p = path.join(currentDir, "data", "products.json");
const p2 = path.join(currentDir, "data", "cart.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      const data = fileContent.toString().trim();
      const products = data ? JSON.parse(data) : [];
      cb(products);
    }
  });
};

const getCartItems = (cb) => {
  fs.readFile(p2, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      const data = fileContent.toString().trim();
      const products = data ? JSON.parse(data) : [];
      cb(products);
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.inTheCart = false;
  }

  save() {
    getProductsFromFile((products) => {
      this.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) console.log(err);
      });
    });
  }

  static addToCart(id) {
    getCartItems((cartItems) => {
      const existingCartItemIndex = cartItems.findIndex(
        (item) => item.id === id
      );
      if (existingCartItemIndex !== -1) {
        console.log("Item already in cart");
        return;
      }
      getProductsFromFile((products) => {
        const product = products.find((p) => p.id === id);
        product.inTheCart = true;
        cartItems.push(product);

        fs.writeFile(p2, JSON.stringify(cartItems), (err) => {
          if (err) console.log(err);
        });

        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) console.log(err);
        });
      });
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const updatedProducts = products.filter((p) => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (err) console.log(err);
      });
    });
    getCartItems((cartItems) => {
      const updatedCartItems = cartItems.filter((item) => item.id !== id);
      fs.writeFile(p2, JSON.stringify(updatedCartItems), (err) => {
        if (err) console.log(err);
      });
    });
  }
  static removeFromCart(id) {
    getCartItems((cartItems) => {
      const updatedCartItems = cartItems.filter((item) => item.id !== id);
      fs.writeFile(p2, JSON.stringify(updatedCartItems), (err) => {
        if (err) console.log(err);
      });

      getProductsFromFile((products) => {
        const product = products.find((p) => p.id === id);
        product.inTheCart = false;
        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) console.log(err);
        });
      });
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static fetchAllCart(cb) {
    getCartItems(cb);
  }
};
