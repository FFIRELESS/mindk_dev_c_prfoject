const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const userFriendsController = require("../controller/userFriends");
const authMiddleware = require("../middlewares/authMiddleware");
// const aclMiddleware = require("../middlewares/aclMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");

const validationRules = require("../services/validator.config");

router.get("/", asyncHandler(userFriendsController.getAllFriends));
router.get("/:id", asyncHandler(userFriendsController.getFriendsById));
router.get(
  "/:id/inReqs",
  asyncHandler(userFriendsController.getInRequestsById)
);
router.get(
  "/:id/outReqs",
  asyncHandler(userFriendsController.getOutRequestsById)
);

router.use(authMiddleware);

router.post(
  "/",
  validationMiddleware(validationRules.commentRules),
  asyncHandler(userFriendsController.createFriend)
);
router.put(
  "/:id",
  validationMiddleware(validationRules.commentRules),
  asyncHandler(userFriendsController.updateFriend)
);
router.delete("/:id", asyncHandler(userFriendsController.deleteFriend));

module.exports = router;
