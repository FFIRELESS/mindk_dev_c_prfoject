const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const authController = require("../controller/auth");

router.post("/login", asyncHandler(authController.authorize));
router.post("/logout", asyncHandler(authController.logout));
router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  asyncHandler(authController.authorizeById)
);
router.post(
  "/facebook",
  passport.authenticate("facebook-token", { session: false }),
  asyncHandler(authController.authorizeById)
);
router.get("/refresh", asyncHandler(authController.refresh));

module.exports = router;
