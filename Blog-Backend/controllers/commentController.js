const db = require("../database/sequelize.js");
const user = require("../models/User.js");
const User = db.user;
const Comment = db.comments;
const commentDAO = require("../dao/commentdao");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

JWT_SECRET_KEY: "pqowieuryt1092837465";

// Set up Global configuration access
dotenv.config();

module.exports.createComment = async (req, res) => {
  try {
    const result = await commentDAO.create(req.body);
    return res.status(200).send({ status: true, data: result });
  } catch (error) {
    console.log("Error at create Comment ", error);
    res.status(400).send({ status: false, error: error.message });
  }
};

module.exports.getAllComments = async (req, res) => {
  try {
    console.log("Inside getAllComment method");
    const result = await commentDAO.findAll();
    console.log("getAllComment api is called. ", result);
    res.status(200).send({ status: true, data: result });
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};

module.exports.updateComment = async (req, res) => {
  try {
    console.log("Comment Update method");
    const result = await commentDAO.update(req.body);
    console.log("Updated user returned based on Id");
    res.status(200).send({ status: true });
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};
module.exports.deleteComment = async (req, res) => {
  try {
    const result = await commentDAO.delete(req.params.id);
    res.status(200).send({ status: true });
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};

module.exports.login = async (req, res) => {
  // Insert Login Code Here
  const email = req.body.email;
  const password = req.body.password;
  const JWT_SECRET_KEY = "pqowieuryt1092837465";

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(403).json({ message: "User not found." });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    // if(!matchPassword)
    // {
    //     res.status(400).json({message: ' Please check either email or password'});
    // }

    const token = jwt.sign({ email: existingUser.email }, JWT_SECRET_KEY);
    return res.status(200).send({ status: true, data: email, token: token });
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }

  // res.send(`Username: ${username} Password: ${password}`);
};

module.exports.generatToken = async (req, res) => {
  try {
    const result = await userDAO.generate_token();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};
