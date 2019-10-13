const path = require("path");
const {
  PATHS: { MIDDLEWARE },
} = require("config");
const { Passport } = require(path.join(MIDDLEWARE, "Passport"));

module.exports = [
  Passport.authenticate("local", {
    successRedirect: "/chatroom",
    failureRedirect: "/login",
  }),
];