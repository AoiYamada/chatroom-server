const path = require("path");
const {
  PATHS: { LIB },
} = require("config");
const { Encryption } = require(path.join(LIB, "Util"));

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    timestamps: true,
  });
  User.register = async (username, password) => {
    password = await Encryption.salt(password);
    const user = await User.create({
      username,
      password,
    });

    return user;
  }
  return User;
};