const path = require("path");
const fs = require("fs");
const {
  PATHS: { LIB, MODEL, STATIC, MIDDLEWARE },
} = require("config");
const {
  Redis: { Chat },
} = require(MODEL);
const {
  Uuid,
  Mime,
} = require(path.join(LIB, "Util"));
const { LoginGuard } = require(path.join(MIDDLEWARE, "Passport"));
let io;

module.exports = [
  LoginGuard,
  async (ctx, next) => {
    if (!io) io = require(path.join(LIB, "Server")).io;
    if (!ctx.request.files) ctx.throw(400, "FIELDS_CANNOT_BE_NULL");

    const file = ctx.request.files.img;
    if (!file) ctx.throw(400, "IMG_CANNOT_BE_NULL");

    const reader = fs.createReadStream(file.path);

    const static_path = `/images/${Uuid()}.${Mime.mime2ext(file.type)}`;

    try {
      const upStream = fs.createWriteStream(path.join(STATIC, static_path));
      reader.pipe(upStream);
    } catch (_) {
      console.log(_);
      ctx.throw(500, "UPLOAD_FAIL");
    }

    const user = ctx.session.passport.user;
    const img_url = `[img](https://yamada.jacen.dev/static${static_path})`;

    const chat = {
      ...user,
      msg: img_url,
    }
    await Chat.create(chat);
    io.emit("broadcast", chat);

    ctx.body = "";
  },
];
