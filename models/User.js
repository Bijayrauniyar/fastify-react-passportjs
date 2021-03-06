const mongoose = require("mongoose");
const findOrCreate = require("mongoose-find-or-create");

const userSchema = new mongoose.Schema({
  serviceProviderId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
userSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", userSchema);
