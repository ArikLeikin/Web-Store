const Product = require("../models/product");
const Order = require("../models/order");
const StoreLocations = require("../models/store-locations");
const User = require("../models/user");
const axios = require("axios");

exports.create = async (req, res) => {
  try {
    const url = req.url;
    const model = url.split("/");
    const expression = model[2];
    console.log(expression);
    const newDocument = req.body;
    //console.log(newDocument);
    // Assuming passed all required params in body
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
        await axios.post(
          "http://localhost:" + process.env.PORT + "/register",
          newDocument
        );
        break;
    }
    return res.status(200).json({
      message: "Created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create",
    });
  }
};

exports.get = async (req, res) => {
  try {
    const id = req.params.id;
    const url = req.url;
    const model = url.split("/");
    const expression = model[2];
    console.log(expression);
    let returnedObject;
    switch (expression) {
      case "product":
        returnedObject = await Product.find({ _id: id });
        break;
      case "order":
        returnedObject = await Order.find({ _id: id });
        break;
      case "store-locations":
        returnedObject = await StoreLocations.find({ _id: id });
        break;
      case "user":
        returnedObject = await User.find({ _id: id });
        break;
      default:
        // Handle cases where the expression doesn't match any of the expected values
        returnedObject = null;
        break;
    }
    console.log(returnedObject);
    if (returnedObject) {
      res.status(200).json({
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
    const id = req.params.id;
    const url = req.url;
    const model = url.split("/");
    const expression = model[2];
    console.log(expression);
    // Assuming passed same names as written in schema
    switch (expression) {
      case "product":
        await Product.findOneAndUpdate({ _id: id }, updated);
        break;
      case "order":
        await Order.findOneAndUpdate({ _id: id }, updated);
        break;
      case "store-locations":
        await StoreLocations.findOneAndUpdate({ _id: id }, updated);
        break;
      case "user":
        await User.findOneAndUpdate({ _id: id }, updated);
        break;
      default:
        // Handle cases where the expression doesn't match any of the expected values
        return res.status(400).json({
          message: "Error with query",
        });
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

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const url = req.url;
    const model = url.split("/");
    const expression = model[2];
    console.log(expression);
    switch (expression) {
      case "product":
        await Product.findOneAndDelete({ _id: id });
        break;
      case "order":
        await Order.findOneAndDelete({ _id: id });
        break;
      case "store-locations":
        await StoreLocations.findOneAndDelete({ _id: id });
        break;
      case "user":
        await User.findOneAndDelete({ _id: id });
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

exports.updatePointsUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const points = req.body.points;
    const user = await User.find({ _id: id });
    if (!user) {
      res.status(400).json("User not found!");
    }
    user.points = points;
    await user.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getProductUpdate = async (req, res, next) => {
  const file = path.join(__dirname, "../public/html/product-update.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
