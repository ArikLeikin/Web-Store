const path = require("path");
const Product = require("../models/product");
const Order = require("../models/order");
const StoreLocations = require("../models/store-locations");
const User = require("../models/user");
const axios = require("axios");
const { pipeline } = require("nodemailer/lib/xoauth2");
const io = require("../app.js");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // Use the appropriate service here
  auth: {
    user: process.env.EMAIL_USERNAME, // Replace with your Gmail email address
    pass: process.env.EMAIL_PASSWORD, // Replace with your Gmail password or App Password
  },
});

async function notifyInterestedUsers(io, productId) {
  const users = await User.find();
  const product = await Product.findById(productId);

  users.forEach(async (user) => {
    const interestedProduct = user.interested.find((product) =>
      product.productId.equals(productId)
    );
    if (interestedProduct) {
      user.interested.splice(user.interested.indexOf(interestedProduct), 1);
      // send mail to user upon back to stock
      transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_USERNAME,
        subject: `${product.title} is back in stock!`,
        html: `
          <p>${product.title} is back! </p>
          <p> For more details enter the following link:<a href="http://localhost:${process.env.PORT}/product-details?id=${productId}">Product page</a></p>
        `,
      });

      // io.to(interestedProduct.socketId).emit("productBackInStock", {
      //   productId,
      // });
      await user.save();
    }
  });
}

exports.create = async (req, res) => {
  try {
    const url = req.url;
    const model = url.split("/");
    const expression = model[2];
    console.log(expression);
    const newDocument = req.body;

    console.log(newDocument);
    // Assuming passed all required params in body
    switch (expression) {
      case "product":
        // newDocument.image = req.files.map(
        //   (image) => image.path.split("public")[1]
        // );
        const {
          price,
          age_range,
          category,
          title,
          condition,
          quantity,
          added_date,
          description,
        } = req.body;
        const checkIfProductExist = await Product.find({ title: title });
        console.log(checkIfProductExist);
        if (checkIfProductExist.length != 0) {
          return res
            .status(401)
            .json({ message: "Product name already in use." });
        }
        const images = req.files["image[]"];
        //console.log(images);
        const product = new Product({
          category: category,
          condition: condition,
          price: price,
          title: title,
          age_range: age_range,
          image: images.map((image) => image.path.split("public")[1]),
          description: description,
          quantity: quantity,
          added_date: new Date(),
        });
        const accessToken = process.env.FACEBOOK_API_KEY;
        const pageId = 111544942041745;

        const message = `A new product called: ${title} has arrived!
        \n Come visit us at: http://127.0.0.1:8080/
        }`;

        const apiUrl = `https://graph.facebook.com/${pageId}/feed`;

        const postData = {
          message: message,
          access_token: accessToken,
        };

        axios
          .post(apiUrl, postData)
          .then((response) => {
            console.log("Post was successfully published:", response.data);
          })
          .catch((error) => {
            console.error("Error publishing post:", error.response.data);
          });

        await product.save();
        // let message =
        //   "A new product has arrived! check out the new product called:\n" +
        //   newDocument.title +
        //   "\n at http://localhost:8080/";
        // await axios.post(
        //   "https://graph.facebook.com/111544942041745/feed?message=" +
        //     message +
        //     "&access_token=" +
        //     process.env.FACEBOOK_API_KEY
        // );
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
    console.log(error);
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
        returnedObject = await Product.findById(id);
        break;
      case "order":
        returnedObject = await Order.findById(id)
          .populate("products.item")
          .populate("user_info");
        break;
      case "store-locations":
        returnedObject = await StoreLocations.findById(id);
        break;
      case "user":
        returnedObject = await User.findById(id);
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
    console.log(req.params);
    console.log(req.body);
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
        //console.log(req.files);
        const image = JSON.parse(JSON.stringify(req.files))["image[]"];
        //console.log(image);
        if (image !== undefined) {
          updated.image = image.map((image) => image.path.split("public")[1]);
        }
        const product = await Product.findById(id);
        //console.log(product.quantity);
        if (product.quantity === 0 && parseInt(updated.quantity) > 0) {
          console.log("inside if");
          notifyInterestedUsers(io, id);
        }
        const users = await User.find();
        await Product.findOneAndUpdate({ _id: id }, updated);
        const productId = id;
        const singleItem = product;
        const quan = parseInt(updated.quantity);
        for (let i = 0; i < users.length; i++) {
          let currUser = users[i];
          let currUserWishList = currUser.wishlist;
          let currUserCart = currUser.cart;
          let ifSave = false;
          //console.log(currUser);
          for (let j = 0; j < currUserWishList.length; j++) {
            if (
              quan === 0 &&
              currUserWishList[j].product.toString() === productId
            ) {
              currUserWishList.splice(j, 1);
              ifSave = true;
              break;
            }
            if (
              currUserWishList[j].product.toString() === productId &&
              quan < currUserWishList[j].quantity
            ) {
              currUserWishList[j].quantity = quan;
              ifSave = true;
              break;
            }
          }
          for (let j = 0; j < currUserCart.items.length; j++) {
            if (
              quan === 0 &&
              currUserCart.items[j].product.toString() === productId
            ) {
              currUserCart.items.splice(j, 1);
              ifSave = true;
              break;
            }

            if (
              currUserCart.items[j].product.toString() === productId &&
              quan < currUserCart.items[j].quantity
            ) {
              currUserCart.items[j].quantity = quan;
              ifSave = true;
              break;
            }
          }
          if (ifSave) await currUser.save();
        }

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
    const users = await User.find();
    switch (expression) {
      case "product":
        await Product.findOneAndDelete({ _id: id });

        for (let i = 0; i < users.length; i++) {
          let currUser = users[i];
          let currUserWishList = currUser.wishlist;
          let currUserCart = currUser.cart;
          let currUserUsedProducts = currUser.usedProducts;
          let ifSave = false;
          for (let j = 0; j < currUserWishList.length; j++) {
            if (currUserWishList[j].product.toString() === id) {
              currUserWishList.splice(j, 1);
              ifSave = true;
              break;
            }
          }
          console.log(id);

          for (let j = 0; j < currUserCart.items.length; j++) {
            if (currUserCart.items[j].product.toString() === id) {
              currUserCart.items.splice(j, 1);
              ifSave = true;
              break;
            }
          }
          for (let j = 0; j < currUserUsedProducts.length; j++) {
            if (currUserUsedProducts[j].toString() === id) {
              currUserUsedProducts.splice(j, 1);
              ifSave = true;
              break;
            }
          }
          if (ifSave) await currUser.save();
        }

        break;
      case "order":
        await Order.findOneAndDelete({ _id: id });
        for (let i = 0; i < users.length; i++) {
          const ordersOfUser = users[i].orderHistory;
          for (let j = 0; j < ordersOfUser.length; j++) {
            if (users[i].orderHistory[j]._id.toString() === id) {
              users[i].orderHistory[j].splice(j, 1);
              return;
            }
          }
        }

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

exports.getOrderUpdate = async (req, res) => {
  try {
    const file = path.join(__dirname, "../public/html/order-update.html");
    res.status(200).sendFile(file);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getStoreLocationEdit = async (req, res) => {
  try {
    const file = path.join(
      __dirname,
      "../public/html/store-location-edit.html"
    );
    res.status(200).sendFile(file);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getEditUser = async (req, res) => {
  try {
    const file = path.join(__dirname, "../public/html/edit-user.html");
    res.status(200).sendFile(file);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getD3 = async (req, res) => {
  try {
    const file = path.join(__dirname, "../public/html/d3.html");
    res.status(200).sendFile(file);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
