const mongoose = require("mongoose");
const User = require("./userModel");
module.exports = mongoose.models.User || User;
