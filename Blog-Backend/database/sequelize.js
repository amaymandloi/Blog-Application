const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/User")(sequelize, Sequelize);
// db.blogs = require("../models/Blog")(sequelize, Sequelize);
db.blogs = require("../models/Blogs")(sequelize, Sequelize);
db.comments = require("../models/Comments")(sequelize, Sequelize);

db.user.hasMany(db.blogs, { foreignKey: "userId" });
db.blogs.belongsTo(db.user, { foreignKey: "userId" });
db.blogs.hasMany(db.comments, { foreignKey: "blogId" });
db.comments.belongsTo(db.blogs, { foreignKey: "blogId" });

db.user.hasOne(db.comments, { foreignKey: "userId" });
db.comments.belongsTo(db.user, { foreignKey: "userId" });

db.sequelize.sync({ force: false });

module.exports = db;
