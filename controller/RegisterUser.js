var UserModel = require("../model/UserModel");
var { getToken, verifyToken } = require("../auth/jwtAuth");
const bcryptjs = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    // const body = await req.body;
    if (req.body.email) {
      const existingUser = await UserModel.findOne({
        email: req.body.email,
      });
      if (existingUser) {
        return res.status(400).json({ message: "Already user exits" });
      }
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(req.body.password, salt);
      req.body.password = hashedPassword;
      const savedUser = await UserModel.create(req.body);

      res.status(201).json({
        message: "User created successfully",
        data: savedUser,
        success: true,
      });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      email: email,
    });
    console.log(user);
    if (user) {
      var token = await getToken(email, password);
      if (token) {
        res.json({ data: user, message: "Login success", token: token });
      } else {
        res.status(401).json({ message: "Invalid token" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.find().select("-password");
    if (user) {
      res.json({ data: user, message: "User fetched successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.Update = async (req, res, next) => {
  const updatedUser = await register.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json({ data: updatedUser, message: "User updated successfully" });
};
