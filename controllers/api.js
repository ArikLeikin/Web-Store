// controllers/supplierController.js
const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const StoreLocations = require("../models/store-locations");

module.exports = {
  getCurrent: async (req, res) => {
    try {
      const user = req.session.user;
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error: err });
    }
  },

  getUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById({ _id: userId });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving user", error: err });
    }
  },
  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findById(req.session.user._id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving user", error: err });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error retrieving users", error: err });
    }
  },

  getSupplier: async (req, res) => {
    try {
      const supplierId = req.params.supplierId;
      const supplier = await Supplier.findById({ _id: supplierId });
      res.status(200).json(supplier);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error retrieving supplier", error: err });
    }
  },

  getAllSuppliers: async (req, res) => {
    try {
      const suppliers = await Supplier.find();
      res.status(200).json(suppliers);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error retrieving suppliers", error: err });
    }
  },

  getWishList: async (req, res) => {
    try {
      //Need to check
      const user = await User.findById(req.session.user._id);
      res.status(200).json(user.wishlist);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error retrieving WishList", error: err });
    }
  },

  getOrderHistory: async (req, res) => {
    try {
      //Need to check
      const user = await User.findById(req.session.user._id).populate({
        path: "orderHistory", // Field containing the array of references
        populate: {
          path: "products", // Field within the nested reference
          model: "Product", // The name of the Product model
        },
      });
      res.status(200).json(user.orderHistory);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error retrieving order history", error: err });
    }
  },

  getOrder: async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const order = await Order.findById({ _id: orderId });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving order", error: err });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving orders", error: err });
    }
  },

  getAllOrdersByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await Order.find({ user_info: userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving orders", error: err });
    }
  },

  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error retrieving products", error: err });
    }
  },

  getProductsByAmount: async (req, res) => {
    try {
      const amount = parseInt(req.params.amountValue);

      if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount value" });
      }

      const randomProducts = await Product.aggregate([
        // Filter only active products
        { $sample: { size: amount } }, // Randomly select 'amount' products
      ]);

      res.status(200).json(randomProducts);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error retrieving random products", error: err });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find(); // Retrieve all products from the database
      res.status(200).json(products); // Send the products as a JSON response
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getProdcutsByCategory: async (req, res, next) => {
    try {
      const category = req.params.categoryName;

      const products = await Product.find({
        category: category,
      });

      res.status(200).json(products);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error retrieving products", error: err });
    }
  },

  getProduct: async (req, res, next) => {
    try {
      const prodId = req.params.productId;
      console.log(prodId);
      const product = await Product.findById({ _id: prodId });
      console.log(product);
      if (product != null)
        res.status(200).json({
          data: product,
        });
      else {
        res.status(400).json({
          message: "Product not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  getSearch: async (req, res, next) => {
    try {
      console.log(req.params.title);
      const title = req.params.title; // need to ask
      const products = await Product.find({
        title: { $regex: title, $options: "i" },
      });
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: "Error in server" });
    }
  },

  getStoreLocations: async (req, res, next) => {
    try {
      const locations = await StoreLocations.find();
      console.log(locations);
      return res.status(200).json({
        data: locations,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  deleteFromYad2List : async (req, res) => {
    try {
      const productId = req.params.id;
      const userId = req.session.user._id;
  
      // Find the user by their ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Remove the product with the given productId from the user's usedProducts array
      user.usedProducts = await user.usedProducts.filter(product => product.toString() !== productId);
  
      // Save the user's updated data
      await user.save();
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}
