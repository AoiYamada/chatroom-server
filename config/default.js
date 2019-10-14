const path = require("path");
const IS_PROD = process.env.NODE_ENV == "prod" || process.env.NODE_ENV == "uat";
const IS_DEV = !IS_PROD;
const SECRET = process.env.SECRET || "secret";

// paths
const CWD = process.cwd();
const APP = path.join(CWD, "app");
const LIB = path.join(CWD, "lib");
const MODEL = path.join(CWD, "model");
const MODULE = path.join(CWD, "module");
const STATIC = path.join(CWD, 'static');
const MIDDLEWARE = path.join(CWD, "middleware");

module.exports = {
  PORT: 3000,
  IS_PROD,
  IS_DEV,
  SECRET,
  PATHS: {
    CWD,
    APP,
    LIB,
    MODEL,
    MODULE,
    STATIC,
    MIDDLEWARE,
  },
  DB: {
    REDIS: {
      host: "redis-service",
      port: 6379,
      password: "",
      defaultDatabase: 0,
    },
    MYSQL: {
      username: "root",
      password: "admin",
      database: "chatroom",
      host: "mysql-service",
      dialect: "mysql",
      logging: false,
      force_sync: false,
      timezone: "+08:00",
      define: {
        underscored: true,
        underscoredAll: true,
        timestamps: false,
        freezeTableName: false,
      },
    },
  },
};
