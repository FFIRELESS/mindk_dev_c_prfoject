const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const config = require("../services/config");
const { createUser, getUserByEmail } = require("./user");

module.exports = () => {
  const registerStrategy = () => {
    passport.use(
      new GoogleTokenStrategy(
        {
          clientID: config.googleClientID,
          clientSecret: config.clientSecret,
        },
        //  Passport verify callback
        async (accessToken, refreshToken, profile, done) => {
          console.log(profile);
          const [{ value: email }] = profile.emails;
          let user = await getUserByEmail(email);
          if (!user) {
            await createUser({
              Fullname: profile.displayName,
              Email: email,
              Image: profile._json.picture,
            });
            user = await getUserByEmail(email);
          }
          return done(null, {
            User_ID: user.User_ID,
            Fullname: user.Fullname,
            Email: user.Email,
          });
        }
      )
    );
  };

  return { registerStrategy, passport };
};
