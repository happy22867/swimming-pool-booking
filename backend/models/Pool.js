const mongoose = require("mongoose");

const poolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  entry: Number,
  timing: String,
  description: String,
  imageUrl: String, // optional to store image link
}, { timestamps: true });

module.exports = mongoose.model("Pool", poolSchema);
