const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const userFriendsController = require("../controller/userFriends");

router.get("/", asyncHandler(userFriendsController.getAllFriends));
router.get("/:User_ID", asyncHandler(userFriendsController.getFriendsById));
router.get(
  "/:User_ID/inReqs",
  asyncHandler(userFriendsController.getInRequestsById)
);
router.get(
  "/:User_ID/outReqs",
  asyncHandler(userFriendsController.getOutRequestsById)
);
router.post("/", asyncHandler(userFriendsController.createFriend));
router.put("/:User_ID", asyncHandler(userFriendsController.updateFriend));
router.delete("/:User_ID", asyncHandler(userFriendsController.deleteFriend));

module.exports = router;
