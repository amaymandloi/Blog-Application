const db = require("../database/sequelize.js");
const user = require("../models/User.js");

const User = db.user;
const Blog = db.blogs;
const Comment = db.comments;

module.exports.create = async (blog) => {
  try {
    const result = await Blog.create(blog);
    return result.dataValues;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.findAll = async () => {
  const condition = {
    include: [
      {
        model: User,
        attributes: ["userId", "userName", "mobileNumber", "email"],
      },
      {
        model: Comment,
        attributes: ["commentId", "comment", "blogId", "userId"],
        include: [
          {
            model: User,
            attributes: ["userId", "userName", "mobileNumber", "email"],
          },
        ],
      },
    ],
    attributes: [
      "blogId",
      "blogName",
      "blogHeading",
      "blogDescription",
      "userId",
    ],
  };
  try {
    const result = await Blog.findAll(condition);
    return result.map((obj) => obj.dataValues);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.find = async (blogID) => {
  const condition = {
    include: [
      {
        model: User,
        attributes: ["userId", "userName", "mobileNumber", "email"],
      },
      {
        model: Comment,
        attributes: ["commentId", "comment", "blogId", "userId"],
        include: [
          {
            model: User,
            attributes: ["userId", "userName", "mobileNumber", "email"],
          },
        ],
      },
    ],
    attributes: [
      "blogId",
      "blogName",
      "blogHeading",
      "blogDescription",
      "userId",
    ],
    where: {
      blogID,
    },
  };
  try {
    const result = await Blog.findOne(condition);
    if (result) {
      return result.dataValues;
    } else {
      return {};
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.update = async (params) => {
  const condition = {
    where: {
      blogId: params.blogId,
    },
  };
  try {
    const result = await Blog.update(params, condition);
    if (result[0] == 0) {
      throw new Error("No record not found to update");
    } else {
      return true;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.delete = async (blogId) => {
  const condition = {
    where: {
      blogId,
    },
  };
  try {
    const result = await Blog.destroy(condition);
    if (result == 0) {
      throw new Error("No record not found to delete");
    } else {
      return true;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.generate_token = () => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
  };
  const token = jwt.sign(data, jwtSecretKey);
  return token;
};

module.exports.verifyToken = () => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send("Successfully Verified");
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    return error;
  }
};
