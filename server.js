const fastify = require("fastify")();
const passport = require("passport");
const cookieSession = require("cookie-session");
const fbRoutes = require("./authRoutes/fbAuth");
const googleRoutes = require("./authRoutes/googleAuth");
const path = require("path");
const mongoose = require("mongoose");
const checkAuth = require("./middleware/checkAuth");
require("dotenv").config();

var admin = require("firebase-admin");

var serviceAccount = require("./social-login-6bab5-firebase-adminsdk-k24as-4a586359a0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://social-login-6bab5.firebaseio.com",
});

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const idToken =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxODQ1OWJiYTE2NGJiN2I5MWMzMjhmODkxZjBiNTY1M2UzYjM4YmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQmlqYXkgUmF1bml5YXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vMzU5Nzk1NjY3MzYzMDM2My9waWN0dXJlIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3NvY2lhbC1sb2dpbi02YmFiNSIsImF1ZCI6InNvY2lhbC1sb2dpbi02YmFiNSIsImF1dGhfdGltZSI6MTU5NDYzODE2OSwidXNlcl9pZCI6ImNXcU1VeFZrelVTTDFLY05ySEFob3NBUER2YzIiLCJzdWIiOiJjV3FNVXhWa3pVU0wxS2NOckhBaG9zQVBEdmMyIiwiaWF0IjoxNTk0NjM4MTY5LCJleHAiOjE1OTQ2NDE3NjksImVtYWlsIjoicmF1bml5YXJiaWpheTExN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZmFjZWJvb2suY29tIjpbIjM1OTc5NTY2NzM2MzAzNjMiXSwiZW1haWwiOlsicmF1bml5YXJiaWpheTExN0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJmYWNlYm9vay5jb20ifX0.UNUky-kuyOO20z9ZnT3qsIKDSBMRyU0BbzjQuyjO-K0F_R4w7V5JLBywKYw-0mO_WTG39TbxYbUtBn6FQPf3KcfrBIecokteTh8tUzBFp7TG-U8UsXGZ_457acglXcaY-7qAbRrxXCyrl65GZT5KY9r2iDmZdOqtWOa5F1KSCqs_j-lW1lOFvXyK4JnBcfR8c_YQTdrchTfzXNftafxDoFvMiuXJ5j9vYO6_L-lKnEaCwld3jxhcuSv46d70i5VEzS4ijxbAafEH6sgeI6KhvyndfT7r0XFtHKXH3OPYLnQDR1YWeJKaoYHqZUSzaaE4JQxEF3dMeTZJSZMTPzBWuw";

// idToken comes from the client app
admin
  .auth()
  .verifyIdToken(idToken)
  .then(function (decodedToken) {
    console.log(decodedToken, "decode token");
    let uid = decodedToken.uid;
    // ...
  })
  .catch(function (error) {
    console.log(error, "error in token");
    // Handle error
  });

fastify.get("/login/success", (req, res) => {
  if (!req.raw.user) {
    res.send("user is not authorized");
  }

  res.send({
    success: true,
    message: "user has successfully authenticated",
    user: req.raw.user,
  });
});

fastify.get("/logout", (req, res) => {
  req.raw.logout();
  req.raw.session = null;
  res.redirect("/app/login");
});

// Client Application
const forntendAppPath = path.join(__dirname, "client/build");
fastify.register(require("fastify-static"), {
  root: forntendAppPath,
});

fastify.get("/app", async (request, reply) => {
  try {
    // reply.send("hello from app");
    reply.sendFile("index.html");
  } catch (err) {
    server.log.error('Error occured when sending Index.html for "/app"');
    server.log.error(err);
  }
});

fastify.get("/", async (request, reply) => {
  try {
    reply.redirect("/app");
  } catch (err) {
    server.log.error('Error occured when redirecting root "/" to "/app"');
    server.log.error(err);
  }
});

fastify.get("/app/*", async (request, reply) => {
  try {
    reply.sendFile("index.html");
  } catch (err) {
    server.log.error(err);
  }
});

fastify.register(require("fastify-express")).after(() => {
  fastify.use(
    cookieSession({
      name: "session",
      keys: ["secretkey"],
      maxAge: 24 * 60 * 60 * 1000,
    })
  );

  fastify.use(
    require("express-session")({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
    })
  );

  fastify.use(passport.initialize());
  fastify.use(passport.session());

  fastify.use(fbRoutes);
  fastify.use(googleRoutes);
});

fastify.register(require("fastify-autoload"), {
  dir: path.join(__dirname, "routes"),
  options: {
    prefix: "/",
  },
});

fastify.listen(3000, console.log);

mongoose
  .connect("mongodb://localhost:27017/passportTest", {
    useNewUrlParser: true,
  })
  .then(() =>
    console.log(
      "✅ 🗄 🗄 🗄 🗄 ✅ MongoDB Connected at: " +
        "mongodb://localhost:27017/passportTest"
    )
  )
  .catch((err) => console.log("Failed to connect to DB: \r\n", err));
