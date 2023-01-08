const db = require("../database/sequelize.js");
const user = require("../models/User.js");

const User = db.user;
const Blogs = db.blogs;
const Comment = db.comments;

module.exports.create = async (comment) => {
  try {
    const result = await Comment.create(comment);
    return result.dataValues;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.findAll = async () => {
  const condition = {
    include: [
      {
        model: Blogs,
        attributes: [
          "blogId",
          "blogName",
          "blogHeading",
          "blogDescription",
          "userId",
        ],
      },
      {
        model: User,
        attributes: ["userId", "userName", "mobileNumber", "email"],
      },
    ],
  };
  try {
    const result = await Comment.findAll(condition);
    return result.map((obj) => obj.dataValues);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.update = async (params) => {
  const condition = {
    where: {
      commentId: params.commentId,
    },
  };
  try {
    const result = await Comment.update(params, condition);
    if (result[0] == 0) {
      throw new Error("No record not found to update");
    } else {
      return true;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.delete = async (commentId) => {
  const condition = {
    where: {
      commentId,
    },
  };
  try {
    const result = await Comment.destroy(condition);
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

module.exports.getPassword = async (userid) => {
  const condition = {
    where: {
      userid,
    },
  };
  try {
    const result = await User.findOne(condition);
    if (result) {
      return result.dataValues;
    } else {
      return {};
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
