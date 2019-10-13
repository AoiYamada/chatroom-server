const { SECRET } = require("config");
const {
  PATHS: { MODEL },
} = require("config");
const {
  MySQL: { User },
} = require(MODEL);

module.exports = [
  async (ctx, next) => {
    const { username, password, secret } = ctx.request.body;

    if (secret !== SECRET) {
      ctx.throw(403, "Incorrect secret.");
    }

    const user = await User.register(username, password);

    ctx.login({
      id: user.id,
      username: user.username,
    }, err => {
      if (err) {
        return next(err);
      }
      return ctx.redirect("/chatroom");
    });
  },
];