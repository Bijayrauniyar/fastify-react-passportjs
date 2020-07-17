const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const { ConnectionStates } = require("mongoose");

passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log(id);
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "150250229803-d664aijghhdr4g777jnokhbgtvhc9epu.apps.googleusercontent.com",
      clientSecret: "EJylANTTv8YTc8xFjXdsFoFV",
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const { email, given_name, family_name, sub } = profile._json;
      const userData = {
        serviceProviderId: sub,
        email,
        firstName: given_name,
        lastName: family_name,
      };

      await User.findOrCreate(userData, (err, result) => {
        // my new or existing model is loaded as result
        done(null, result);
      });
    }
  )
);
