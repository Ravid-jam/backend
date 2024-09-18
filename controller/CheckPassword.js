var UserModel = require("../model/UserModel");
const bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { getToken } = require("../auth/jwtAuth");

module.exports.checkPassword = async (req, res, next) => {
  try {
    const { password, userId } = req.body;
    const user = await UserModel.findById(userId);

    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return res
        .status(401)
        .json({ message: "Please check password", error: true });
    }
    const cookieOptions = {
      http: true,
      secure: false,
    };
    const tokenData = {
      id: user.id,
      email: user.email,
    };
    const token = await getToken(tokenData);
    return res.cookie("token", token, cookieOptions).status(200).json({
      message: "verify password",
      token: token,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
