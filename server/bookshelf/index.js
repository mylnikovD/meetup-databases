const env = process.env.NODE_ENV || "development";
const connectionConfig = require(__dirname + "/../config/config.json")[env];

const knex = require("knex")({
  client: "pg",
  connection: {
    host: connectionConfig.host,
    user: connectionConfig.username,
    password: connectionConfig.password,
    database: connectionConfig.database,
    charset: "utf8"
  }
});
const bookshelf = require("bookshelf")(knex);
// Defining models

const Role = bookshelf.model("Role", {
  tableName: "Roles",
  hasTimestamps: ['createdAt', 'updatedAt'],
  Users() {
    return this.hasMany(User);
  }
});

const User = bookshelf.model("User", {
  tableName: "Users",
  hasTimestamps: ['createdAt', 'updatedAt'],
  Posts() {
    return this.hasMany("Post");
  },
  Role() {
    return this.belongsTo(Role, 'roleID');
  }
});

const Post = bookshelf.model("Post", {
  tableName: "Posts",
  hasTimestamps: ['createdAt', 'updatedAt'],
  user() {
    return this.belongsTo(User, 'authorID');
  }
});

module.exports = { knex, bookshelf, Role, User, Post };
