const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "pqowieuryt1092837465";

const auth = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    console.log(req.headers);
    const verified = jwt.verify(token, JWT_SECRET_KEY);
    console.log("line 18", verified);
    if (verified) {
      console.log("Middleware for authentication is called");
      next();
    } else {
      res.status(401).json({ message: "Un-authorized User" });
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
};
module.exports = auth;

