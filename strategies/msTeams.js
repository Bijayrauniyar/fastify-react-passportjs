const passport = require("passport");
const strategy = require("passport-azure-ad-oauth2");
const User = require("../models/User");

const AzureAdOAuth2Strategy = strategy.Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new AzureAdOAuth2Strategy(
    {
      clientID: "c37907bd-62f6-4ead-be19-16e246bd91ba",
      clientSecret: "{YOUR_CLIENT_SECRET}",
      callbackURL: "http://localhost:3001/app",
      //resource: "00000002-0000-0000-c000-000000000000",
      tenant: "d98941a7-ce70-4286-9ec7-8341bfa6c276",
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
