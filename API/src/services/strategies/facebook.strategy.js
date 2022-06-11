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
      const email = profile._json.email;
      let user = await getUserByEmail(email);
      if (!user) {
        await createUser({
          body: {
            Username: email,
            Fullname: profile.displayName,
            Email: email,
            Image: profile.photos[0].value,
          },
        });
        user = await getUserByEmail(email);
      }
      return done(null, {
        User_ID: user.User_ID,
        Username: user.Username,
        Fullname: user.Fullname,
        Email: user.Email,
      });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
