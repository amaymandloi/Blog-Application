module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define("comments", {
    commentId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    comment: {
      type: Sequelize.STRING,
    },
    blogId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
  });

  return Comments;
};
