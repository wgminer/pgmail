const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    verified: Boolean,
    active: Boolean,
    sends: [
      {
        sentOn: Date,
        title: String,
        url: String,
        essay: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Essay"
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);
