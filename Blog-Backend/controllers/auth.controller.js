const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
  
// Set up Global configuration access
dotenv.config();

module.exports.generatetoken = (req, res) => {
    // Validate User Here
    // Then generate JWT Token
  
    let jwtSecretKey = "hello";
    let data = {
        time: Date(),
        userId: 12,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    res.send(token);
};

module.exports.validateToken =  (req, res) => {
    // Tokens are generally passed in the header of the request
    // Due to security reasons.
  
    // let tokenHeaderKey = "world";
    let jwtSecretKey = "hello";
  
    try {
        const token = req.headers["x-access-token"];
        console.log(req.headers);
        const verified = jwt.verify(token, jwtSecretKey);
        console.log(verified);
        if(verified){
            console.log("Successfully Verified")
            return res.send("Successfully Verified");

        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
};