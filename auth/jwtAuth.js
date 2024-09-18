var jwt = require("jsonwebtoken");

const getToken = (tokenData) => {
  const token = jwt.sign(tokenData, process.env.SECRET_KEY);
  return token;
};

const verifyToken = (oldToken) => {
  try {
    const token = jwt.verify(oldToken, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    return null;
  }
};

module.exports = { getToken, verifyToken };
