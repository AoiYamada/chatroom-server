const serve = require("koa-static");
const mount = require("koa-mount");
const {
  PATHS: { STATIC },
} = require("config");

module.exports = (path, maxage = 3600000) => mount(path, serve(STATIC, { maxage }));
