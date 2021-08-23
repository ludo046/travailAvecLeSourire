"use strict";

require("dotenv").config();

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USERS,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db

db.User = require("./user")(sequelize,Sequelize);
db.Ressource = require('./ressource')(sequelize,Sequelize);
db.Chat = require('./chat')(sequelize,Sequelize);


db.User.hasMany(db.Ressource, {
  foreignKey: "userId",
  as: "user_ressource",
});

db.Ressource.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user_ressource",
});

db.User.hasMany(db.Chat, {
  foreignKey:"userId",
  as: "user_chat"
});

db.Chat.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user_chat"
})