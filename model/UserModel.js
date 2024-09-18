var mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "provided name"],
    },
    email: {
      type: String,
      required: [true, "provided name"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "provided password"],
    },
    profile_pic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
