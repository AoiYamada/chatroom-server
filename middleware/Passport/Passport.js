const path = require("path");
const { Strategy } = require("passport-local");
const {
  PATHS: { MODEL, LIB },
} = require("config");
const {
  MySQL: { User },
} = require(MODEL);
const { Encryption } = require(path.join(LIB, "Util"));

module.exports = passport => {
  // https://stackoverflow.com/questions/19948816/passport-js-error-failed-to-serialize-user-into-session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new Strategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!await Encryption.verify(password, user.password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, {
          id: user.id,
          username: user.username,
        });
      } catch (err) {
        done(err);
      }
    }
  ));

  return passport;
};