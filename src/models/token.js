const mongoose = require("mongoose");


const token = mongoose.model("token", new  mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // expiry time in seconds
  },
}));
module.exports = token
