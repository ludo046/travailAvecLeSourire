"use strict";

module.exports = {
  dialect: "mysql",
  host: '185.216.25.196',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
