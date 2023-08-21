const Product = require("../models/product");
const Order = require("../models/order");
const Supplier = require("../models/supplier");
const StoreLocations = require("../models/store-locations");
const User = require("../models/user");

exports.create = async (req, res) => {
  try {
    const url = req.url;
    const model = url.split("/");
    const expression = model[1];
    console.log(expression);
    const newDocument = req.body;
    switch (expression) {
      case "product":
        await Product.create(newDocument);
        break;
      case "order":
        await Order.create(newDocument);
        break;
      case "store-locations":
        await StoreLocations.create(newDocument);
        break;
      case "user":
        await User.create(newDocument);
        break;
    }
    const product = res.status(201).json({
      message: "Created successfully",
    });
  } catch (error) {
    res.code(500).json({
      message: "Failed to create",
    });
  }
};

exports.get = async (req, res) => {
  try {
    const id = req.id;
    const url = req.url;
    const model = url.split("/");
    const expression = model[2];
    console.log(expression);
    let returnedObject;
    switch (expression) {
      case "product":
        returnedObject = await Product.find(id);
        break;
      case "order":
        returnedObject = await Order.find(id);
        break;
      case "store-locations":
        returnedObject = await StoreLocations.find(id);
        break;
      case "user":
        returnedObject = await User.find(id);
        break;
      default:
        // Handle cases where the expression doesn't match any of the expected values
        returnedObject = null;
        break;
    }
    console.log(returnedObject);
    if (returnedObject) {
      res.status(201).json({
        data: returnedObject,
        message: "Retrieved successfully",
      });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = req.body;
    const id = req.id;
    const url = req.url;
    const model = url.split("/");
    const expression = model[2];
    console.log(expression);
    switch (expression) {
      case "product":
        await Product.findOneAndUpdate(id, updated);
        break;
      case "order":
        await Order.findOneAndUpdate(id, updated);
        break;
      case "store-locations":
        await StoreLocations.findOneAndUpdate(id, updated);
        break;
      case "user":
        await User.findOneAndUpdate(id, updated);
        break;
      default:
        // Handle cases where the expression doesn't match any of the expected values
        return res.status(400).json({
          message: "Error with query",
        });
        break;
    }
    res.status(200).json({
      message: "Updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const updated = req.body;
    const id = req.id;
    const url = req.url;
    const model = url.split("/");
    const expression = model[2];
    console.log(expression);
    switch (expression) {
      case "product":
        await Product.findOneAndDelete(id);
        break;
      case "order":
        await Order.findOneAndDelete(id);
        break;
      case "store-locations":
        await StoreLocations.findOneAndDelete(id);
        break;
      case "user":
        await User.findOneAndDelete(id);
        break;
      default:
        // Handle cases where the expression doesn't match any of the expected values
        return res.status(400).json({
          message: "Error with query",
        });
        break;
    }
    res.status(200).json({
      message: "Deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
