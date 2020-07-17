const passport = require("passport");
const fbRoutes = require("express").Router();
require("../strategies/facebook");

// fbRoutes.use(function (req, res, next) {
//   res.setHeader("x-custom", true);
//   next();
// });

fbRoutes.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

fbRoutes.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/app", // client url
    failureRedirect: "/app/login", // client url
  })
);

// fbRoutes.get("/logout", (req, res) => {
//   console.log(req, "logout reques");
//   //req.raw.logout();
//   // res.redirect("/app/login");
// });

module.exports = fbRoutes;
