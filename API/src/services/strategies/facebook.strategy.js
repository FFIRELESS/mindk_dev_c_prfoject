const passport = require("passport");
const config = require("../config");

const FacebookTokenStrategy = require("passport-facebook-token");
const { getUserByEmail, createUser } = require("../../controller/users");

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: config.facebookClientID,
      clientSecret: config.facebookClientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      const [{ value: email }] = profile.emails;
      let user = await getUserByEmail(email);
      if (!user) {
        await createUser({
          body: {
            Fullname: profile.displayName,
            Email: email,
            Image: profile._json.picture,
          },
        });
        user = await getUserByEmail(email);
      }
      return done(null, {
        id: user.user_id,
        name: user.name,
        email: user.email,
      });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
