const passport = require("passport");
const googleRoutes = require("express").Router();
require("../strategies/google");

// googleRoutes.use(function (req, res, next) {
//   res.setHeader("x-custom", true);
//   next();
// });

googleRoutes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleRoutes.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/fail" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/success");
  }
);

module.exports = googleRoutes;
