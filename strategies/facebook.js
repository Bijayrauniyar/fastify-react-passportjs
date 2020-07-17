const passport = require("passport");

const FacebookStrategy = require("passport-facebook").Strategy;

const User = require("../models/User");

passport.use(
  new FacebookStrategy(
    {
      clientID: "735909210284092",
      clientSecret: "cba45489061cb0d2cdd69c7a1620312b",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["email", "name"],
    },

    async function (accessToken, refreshToken, profile, done) {
      const { email, first_name, last_name, id } = profile._json;
      const userData = {
        serviceProviderId: id,
        email,
        firstName: first_name,
        lastName: last_name,
      };

      await User.findOrCreate(userData, (err, result) => {
        // my new or existing model is loaded as result
        done(null, result);
      });
    }
  )
);
