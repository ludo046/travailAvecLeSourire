"use strict";

module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define(
    "chat",
    {
      id:{
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        allowNull: false,
        type : Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      contactId: {
        allowNull: true,
        type : Sequelize.INTEGER
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      movie: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      roomId:{
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    },
    {
      sequelize,
      tableName: "chat",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "ordreDate",
          using: "BTREE",
          fields: [{ name: "createdAt" }],
        },
        {
          name: "fk_ressource_user_idx",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
      ],
    }
  );
  return Chat;
}