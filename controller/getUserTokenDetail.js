const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");

const getUserDetailFromToken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }
  const decoded = await jwt.verify(token, process.env.SECRET_KEY);
  const user = await UserModel.findById(decoded.id).select("-password");
  return user;
};

module.exports = getUserDetailFromToken;
