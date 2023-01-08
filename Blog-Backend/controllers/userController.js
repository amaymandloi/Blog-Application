const db = require("../database/sequelize.js");
const user = require("../models/User.js");
const User = db.user;
const userDAO = require("../dao/userdao");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

JWT_SECRET_KEY: "pqowieuryt1092837465";

// Set up Global configuration access
dotenv.config();

module.exports.createUser = async (req, res) => {
  try {
    const result = await userDAO.create(req.body);
    return res.status(200).send({ status: true, data: result });
  } catch (error) {
    console.log("Avi===", error);
    res.status(400).send({ status: false, error: error.message });
  }
};

module.exports.getAllUser = async (req, res) => {
  try {
    console.log("Inside getAll method");
    const result = await userDAO.findAll();
    console.log("getAll api is called. ", result);
    res.status(200).send({ status: true, data: result });
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};
module.exports.getUserById = async (req, res) => {
  try {
    console.log("req param==>  ", req.params.id);
    const result = await userDAO.find(req.params.id);
    console.log("API for GET User based on ID is called.");
    res.status(200).send({ status: true, data: result });
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};
module.exports.updateUser = async (req, res) => {
  try {
    console.log("Method updateUser() called to update user based on id");
    const result = await userDAO.update(req.body);
    console.log("Updated user returned based on Id");

    res.status(200).send({ status: true });
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};
module.exports.deleteUser = async (req, res) => {
  try {
    const result = await userDAO.delete(req.params.id);
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
    const existingUser = await userDAO.getUserByEmail(email);

    console.log("user is present", existingUser);
    if (!existingUser) {
      return res
        .status(403)
        .json({ status: false, message: "User not found." });
    }

    if (password !== existingUser.password) {
      return res.status(403).json({
        status: false,
        message: "Please check either email or password",
      });
      // res
      //   .status(400)
      //   .json({ message: " Please check either email or password" });
    }
    // attributes: ["userId", "userName", "mobileNumber", "email"],
    const token = jwt.sign({ email: existingUser.email }, JWT_SECRET_KEY);
    return res.status(200).send({
      status: true,
      data: {
        userId: existingUser.userId,
        userName: existingUser.userName,
        email: existingUser.email,
        mobileNumber: existingUser.mobileNumber,
      },
      token: token,
    });
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};

module.exports.generatToken = async (req, res) => {
  try {
    const result = await userDAO.generate_token();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};
