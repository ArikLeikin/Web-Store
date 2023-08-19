module.exports = (req, res, next) => {
  if (req.session.user.permission !== "admin") {
    return res.redirect("/");
  }
  next();
};
