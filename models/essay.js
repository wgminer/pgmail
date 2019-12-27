const mongoose = require("mongoose");

const EssaySchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    html: String,
    url: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Essay", EssaySchema);
