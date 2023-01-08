module.exports = (sequelize, Sequelize) => {
  const Blogs = sequelize.define("blogs", {
    blogId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blogName: {
      type: Sequelize.STRING,
    },
    blogHeading: {
      type: Sequelize.STRING,
    },
    blogDescription: {
      type: Sequelize.STRING,
    },
    userId: Sequelize.INTEGER,
  });

  return Blogs;
};
