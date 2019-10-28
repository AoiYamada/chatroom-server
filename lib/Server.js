const Koa = require("koa");
const app = new Koa();
const http = require("http");
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);

const path = require("path");
const helmet = require("koa-helmet");
const cors = require("@koa/cors");
const logger = require("koa-logger");
const compress = require("koa-compress");
const koaBody = require("koa-body");
const zlib = require("zlib");
const limiter = require("koa2-ratelimit").RateLimit.middleware;

const {
  PATHS: { APP, MIDDLEWARE },
  // IS_PROD,
  IS_DEV,
  SECRET,
} = require("config");

const router = require(path.join(APP, "router"));
const Static = require(path.join(MIDDLEWARE, "Static"));
const ErrorHandler = require(path.join(MIDDLEWARE, "ErrorHandler"));
const { Passport } = require(path.join(MIDDLEWARE, "Passport"));
const { ResponseTime } = require(path.join(MIDDLEWARE, "ResponseTime"));

// https://segmentfault.com/a/1190000013039187
const Session = require("koa-session");
const session = Session(app);

app.keys = [SECRET];

app
  .use(
    limiter({
      interval: { min: 10 },
      max: 3600, // limit each IP to 3600 requests per interval
      message: "Too many request, get out!",
    })
  )
  .use(helmet())
  .use(
    cors({
      origin: "*",
      // allowMethods: [],
      // exposeHeaders: [],
      // allowHeaders: [],

      /* http://www.ruanyifeng.com/blog/2016/04/cors.html
        该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。
        默认情况下，Cookie不包括在CORS请求之中。设为true，
        即表示服务器明确许可，Cookie可以包含在请求中，
        一起发给服务器。这个值也只能设为true，
        如果服务器不要浏览器发送Cookie，删除该字段即可。
      */
      // credentials: true,
      keepHeadersOnError: IS_DEV,
    })
  )
  .use(logger())
  .use(ResponseTime())
  .use(
    compress({
      filter: content_type => {
        return /text/i.test(content_type);
      },
      threshold: 2048,
      flush: zlib.Z_SYNC_FLUSH,
    })
  )
  .use(
    koaBody({
      multipart: true,
      includeUnparsed: true,
    })
  )
  .use(session)
  .use(Passport.initialize())
  .use(Passport.session())
  .use(ErrorHandler())
  .use(Static("/static"))
  .use(router.routes())
  .use(router.allowedMethods());

// https://stackoverflow.com/questions/13095418/how-to-use-passport-with-express-and-socket-io
io.use(async (socket, next) => {
  let error = null;
  try {
    // https://gist.github.com/albertogasparin/1fffb9c77a5296598ffa5c594a79eb67
    // create a new (fake) Koa context to decrypt the session cookie
    const fn = compose(app.middleware);
    const ctx = app.createContext(socket.request, new http.OutgoingMessage());

    // https://github.com/koajs/koa/blob/422e539e8989e65ba43ecc39ddbaa3c4f755d465/lib/application.js
    // fnMiddleware(ctx).then
    await fn(ctx);
    socket.session = ctx.session;
    if (!ctx.isAuthenticated()) {
      throw "FORBIDDEN";
    }
  } catch (err) {
    error = err;
  }

  return next(error);
});

module.exports = {
  app,
  server,
  io,
  // session,
}

// https://github.com/koajs/compose/blob/master/index.js
function compose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}