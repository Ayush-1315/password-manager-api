const mongoose = require("mongoose");
const passwordSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  lastAccessed: { type: Date, default: Date.now },
  remindAfterDays: { type: Number },
  description: {
    type: String,
    default: " ",
  },
});

module.exports = { passwordSchema };
