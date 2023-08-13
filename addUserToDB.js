const mongoose = require("mongoose");
const User = require("./models/user"); // Make sure to adjust the path to your user schema file

mongoose.connect(
  "mongodb+srv://playtopia:playtopia@webstore.svlylpv.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", async () => {
  console.log("Connected to the database");

  // Create a new user object based on the user schema
  const newUser = new User({
    permission: "admin",
    username: "admin",
    password: "admin",
    email: "admin@admin.admin",
    name: {
      firstName: "admin",
      lastName: "admin",
    },
    phoneNumber: "",
    address: {
      city: "",
      street: "",
      country: "",
      postalCode: "",
    },
    creditCard: "",
  });

  // Save the user to the database
  try {
    const savedUser = await newUser.save();
    console.log("User saved:", savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
  }

  // Close the database connection
  db.close();
});
