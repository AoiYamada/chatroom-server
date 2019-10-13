const path = require("path");
const fs = require("fs");
const {
  PATHS: { MIDDLEWARE },
} = require("config");
const { LoginGuard } = require(path.join(MIDDLEWARE, "Passport"));
const page = fs.readFileSync(path.join(__dirname, "source", "index.html"));

module.exports = [
  LoginGuard,
  async (ctx, next) => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = page;
  },
];
