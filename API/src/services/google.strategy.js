const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const config = require("./config");
const { createUser, getUserByEmail } = require("../services/user");

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
          const [{ value: email }] = profile.emails;
          let user = await getUserByEmail(email);
          if (!user) {
            await createUser({
              name: profile.displayName,
              email,
            });
            user = await getUserByEmail(email);
          }

          console.log("google strategy THERE"); //*******************************

          return done(null, {
            id: user.User_ID,
            name: user.Fullname,
            email: user.Email,
          });
        }
      )
    );
  };

  return { registerStrategy, passport };
};
