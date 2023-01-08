const db = require("../database/sequelize.js");
const blog = require("../models/User.js");
const User = db.user;
const userDAO = require("../dao/userdao");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const blogDAO = require("../dao/blogdao");

JWT_SECRET_KEY: "pqowieuryt1092837465";

// Set up Global configuration access
dotenv.config();

module.exports.createBlog = async (req, res) => {
  try {
    console.log("Datta ", req.body);
    console.log("INsyieee");
    const result = await blogDAO.create(req.body);
    return res.status(200).send({ status: true, data: result });
  } catch (error) {
    console.log("createBlog=>", error);
    res.status(400).send({ status: false, error: error.message });
  }
};

module.exports.getAllBlog = async (req, res) => {
  try {
    console.log("Inside getAll method");
    const result = await blogDAO.findAll();
    console.log("getAll api is called. ", result);
    res.status(200).send({ status: true, data: result });
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};

module.exports.getBlogById = async (req, res) => {
  try {
    console.log("req param==>  ", req.params.id);
    const result = await blogDAO.find(req.params.id);
    console.log("API for GET User based on ID is called.");
    res.status(200).send({ status: true, data: result });
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};
module.exports.updateBlog = async (req, res) => {
  try {
    console.log("Method updateBlog() called to update Blog based on id");
    const result = await blogDAO.update(req.body);
    console.log("Updated user returned based on Id");

    res.status(200).send({ status: true });
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};
module.exports.deleteBlog = async (req, res) => {
  try {
    const result = await blogDAO.delete(req.params.id);
    res.status(200).send({ status: true });
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};

// module.exports.login = async (req, res) => {
//   // Insert Login Code Here
//   const email = req.body.email;
//   const password = req.body.password;
//   const JWT_SECRET_KEY = "pqowieuryt1092837465";

//   try {
//     const existingUser = await User.findOne({ email: email });
//     if (!existingUser) {
//       return res.status(403).json({ message: "User not found." });
//     }

//     const matchPassword = await bcrypt.compare(password, existingUser.password);

//     // if(!matchPassword)
//     // {
//     //     res.status(400).json({message: ' Please check either email or password'});
//     // }

//     const token = jwt.sign({ email: existingUser.email }, JWT_SECRET_KEY);
//     return res.status(200).send({ status: true, data: email, token: token });
//   } catch (error) {
//     res.status(400).send({ status: false, error: error.message });
//   }

//   // res.send(`Username: ${username} Password: ${password}`);
// };

module.exports.generatToken = async (req, res) => {
  try {
    const result = await userDAO.generate_token();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};
