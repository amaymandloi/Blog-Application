const express = require("express");
const cors = require("cors");
const router = express.Router();

const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/auth.controller");
const auth = require("../middleware/authentication");
const verify = require("../middleware/verifyToken");
const Blog = require("../models/Blogs");
const Comments = require("../models/Comments");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
// Creating new user
router.post("/user", userController.createUser);
// Get all users
router.get("/user", auth, userController.getAllUser);
// Get user by Id
router.get("/user/:id", auth, userController.getUserById);
// To update user
router.put("/user", auth, userController.updateUser);
// Delete user by Id
router.delete("/user/:id", auth, userController.deleteUser);
//Signing in a user by email
router.post("/login", userController.login);
// router.get("/getAllBlog", blogController.getAllBlog);
//generating jwt token
router.post("/user/generateToken", authController.generatetoken);
//verifying jwt token
router.get("/validate-token", authController.validateToken);

// Creating new blog
router.post("/blog", blogController.createBlog);
// Get all blog
router.get("/blog", auth, blogController.getAllBlog);
// Get blog by Id
router.get("/blog/:id", auth, blogController.getBlogById);
// To update blog
router.put("/updateBlog", auth, blogController.updateBlog);
// Delete blog by Id
router.delete("/deleteBlog/:id", auth, blogController.deleteBlog);

// Creating new comment
router.post("/comment", commentController.createComment);
// Get all comment
router.get("/comment", auth, commentController.getAllComments);
// To update comment
router.put("/updateComment", auth, commentController.updateComment);
// Delete comment by Id
router.delete("/deleteComment/:id", auth, commentController.deleteComment);

module.exports = router;
