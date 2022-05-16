const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const userFriendsController = require("../controller/userFriends");

router.post("/", asyncHandler(userFriendsController.createFriend));
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
router.put("/:id", asyncHandler(userFriendsController.updateFriend));
router.delete("/:id", asyncHandler(userFriendsController.deleteFriend));

module.exports = router;
