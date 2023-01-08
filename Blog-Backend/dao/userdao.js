const db = require("../database/sequelize.js");
const user = require("../models/User.js");

const User = db.user;
const Blogs = db.blogs;

module.exports.create = async (user) => {
  try {
    const result = await User.create(user);
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
    ],
    attributes: ["userId", "userName", "mobileNumber", "email"],
  };
  try {
    const result = await User.findAll(condition);
    return result.map((obj) => obj.dataValues);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.find = async (userId) => {
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
    ],
    attributes: ["userId", "userName", "mobileNumber", "email"],
    where: {
      userId,
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

module.exports.update = async (params) => {
  const condition = {
    where: {
      userid: params.userid,
    },
  };
  try {
    const result = await User.update(params, condition);
    if (result[0] == 0) {
      throw new Error("No record not found to update");
    } else {
      return true;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.delete = async (userid) => {
  const condition = {
    where: {
      userid,
    },
  };
  try {
    const result = await User.destroy(condition);
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

module.exports.getUserByEmail = async (email) => {
  const condition = {
    where: {
      email,
    },
    // attributes: ["userId", "userName", "mobileNumber", "email"],
  };
  try {
    const result = await User.findOne(condition);
    if (result) {
      console.log("User Present", result);
      return result.dataValues;
    } else {
      return {};
    }
  } catch (error) {
    throw new Error(error.message);
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
