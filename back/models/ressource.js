"use strict";

module.exports = (sequelize, Sequelize) => {
  const Ressources = sequelize.define(
    "ressource",
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
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(5000)
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      movie: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      project: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      parcours: {
        allowNull: false,
        type: Sequelize.STRING(100),
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
      tableName: "ressource",
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
  return Ressources;
}