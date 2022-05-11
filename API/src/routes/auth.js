const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const {
  authorize,
  refresh,
  logout,
  authorizeById,
} = require("../controller/auth");
const UnauthorizedException = require("../exceptions/UnauthorizedException");
const ForbiddenException = require("../exceptions/ForbiddenException");

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { accessToken, refreshToken } = await authorize(
      req.body.Email,
      req.body.Password
    );
    if (accessToken) {
      return res.send({
        accessToken,
        refreshToken,
        success: true,
      });
    }
    throw UnauthorizedException;
  })
);

router.post(
  "/refresh",
  asyncHandler(async (req, res) => {
    const { accessToken, refreshToken } = await refresh(req.body.refreshToken);
    if (accessToken) {
      return res.send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        success: true,
      });
    }
    throw ForbiddenException;
  })
);

router.post("/logout", asyncHandler(logout));

router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  asyncHandler(authorizeById)
);

router.post(
  "/facebook",
  passport.authenticate("facebook-token", { session: false }),
  asyncHandler(authorizeById)
);

module.exports = router;
