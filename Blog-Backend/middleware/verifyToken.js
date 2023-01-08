const { verifyToken } = require("../dao/userdao");

module.exports.validateToken = (req, res, next) => {
  // Tokens are generally passed in the header of the request
  // Due to security reasons.

  // let tokenHeaderKey = "world";
  const JWT_SECRET_KEY = "pqowieuryt1092837465";

  try {
    const token = req.headers["x-access-token"];
    console.log(req.headers);
    const verified = jwt.verify(token, jwtSecretKey);
    console.log(verified);
    if (verified) {
      next();
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
};

module.exports = verifyToken;
