/**
 * Users
 * Users index route
 *
 * @format
 * @routes
 */

"use strict";

const checkAuth = require("../middleware/checkAuth");

module.exports = async function (fastify, opts) {
  const routes = [
    {
      method: "GET",
      url: "/profile",
      preValidation: checkAuth,
      handler: (req, res) => {
        res.send(req.raw.user);
      },
    },
  ];

  routes.forEach((route) => {
    fastify.route(route);
  });
};
