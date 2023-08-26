const Product = require("../models/product");
const Order = require("../models/order");
const StoreLocations = require("../models/store-locations");
const User = require("../models/user");
const axios = require("axios");
const { pipeline } = require("nodemailer/lib/xoauth2");

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
        newDocument.image = req.files.map((image) => image.path);
        await Product.create(newDocument);
        let message =
          "A new product has arrived! check out the new product called:" +
          newDocument.title +
          "\n at http://localhost:8080";
        await axios.post(
          "https://graph.facebook.com/111544942041745/feed?message=" +
            message +
            "&access_token=" +
            process.env.FACEBOOK_API_KEY
        );
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
    console.log(req.url);
    const url = req.url;
    const model = url.split("/");
    const expression = model[2];
    console.log(expression);
    // Assuming passed same names as written in schema
    switch (expression) {
      case "product":
        const image = JSON.parse(JSON.stringify(req.files))["image[]"];
        updated.image = image.map((image) => image.path);
        console.log(updated);
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

exports.getStoreByAreaCode = async (req, res) => {
  try {
    const areaCode = req.params.areaCode;
    const stores = await StoreLocations.find({ phone_area_code: areaCode });
    res.status(200).json(stores);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOrdersByUser = async (req, res, next) => {
  try {
    const userId = req.parms.id;
    const orders = await Order.find({ user_info: userId });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.ordersGroupByUser = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$user_info", // Group by user_info
          totalOrders: { $sum: 1 }, // Calculate total order count
          totalRevenue: { $sum: "$total_price" }, // Calculate total revenue
        },
      },
      {
        $lookup: {
          from: "users", // Collection name for the User model
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field from the result
          user_info: "$_id",
          totalOrders: 1,
          totalRevenue: 1,
          user: { $arrayElemAt: ["$user", 0] }, // Extract the user object from the array
        },
      },
    ];

    const result = await Order.aggregate(pipeline);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUsersByCountry = async (req, res) => {
  try {
    const country = req.params.country;
    const users = await User.find({ "address.country": country });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.usersGroupBy = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$permission", // Group by permission
          users: {
            $push: {
              _id: "$_id", // User ID
              name: "$name",
            },
          },
        },
      },
    ];
    const result = await User.aggregate(pipeline);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
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
