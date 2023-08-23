module.exports = (req, res, next) => {
  //console.log(req.session);
  if (req.session.user.permission !== "admin") {
    return res.redirect("/");
  }
  next();
};
