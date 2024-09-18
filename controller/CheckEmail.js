var UserModel = require("../model/UserModel");
module.exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await UserModel.findOne({ email }).select("-password");
    if (!existingUser) {
      return res.status(400).json({ message: "User not exits", error: true });
    }

    return res.status(200).json({
      message: "email verified",
      data: existingUser,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
