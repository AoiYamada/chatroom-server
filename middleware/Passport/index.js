const passport = require('koa-passport');
const LoginGuard = require("./LoginGuard");
const Passport = require("./Passport")(passport);

module.exports = {
  LoginGuard,
  Passport,
}
