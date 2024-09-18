const jwt = require("jsonwebtoken");
const { verifyToken } = require("./jwtAuth");

module.exports = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res.json({ message: "Invalid authorization" });
  }
  try {
    const token = verifyToken(authToken);
    if (token) {
      next();
    }
  } catch (error) {
    return res.json({ message: "token not valid" });
  }
};
