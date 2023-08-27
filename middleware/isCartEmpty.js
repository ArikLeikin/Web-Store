const User = require("../models/user");
module.exports = async (req, res, next) => {
  const user = await User.findById(req.session.user._id);
  if (user.cart.items.length === 0) {
    return res.redirect("/cart");
  }
  next();
};
