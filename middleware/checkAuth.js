/**
 * Auth
 *
 * @format
 * @middleware
 */

module.exports = async function (req, reply, next) {
  if (req.raw.user) return next();
  else {
    reply
      .code(400)
      .type("text/plain")
      .send("access denied user is not authenticated");
  }
};
