const passport = require("passport");
const teamsRoutes = require("express").Router();
require("../strategies/facebook");

teamsRoutes.get(
  "/auth/azureadoauth2",
  passport.authenticate("azure_ad_oauth2")
);

teamsRoutes.get(
  "/auth/azureadoauth2/callback",
  passport.authenticate("azure_ad_oauth2", { failureRedirect: "/fail" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/success");
  }
);

// teamsRoutes.get("/fail", (req, res) => {
//   res.send("Failed attempt");
// });

// teamsRoutes.get("/success", (req, res) => {
//   res.send("Success");
// });

module.exports = fbRoutes;
