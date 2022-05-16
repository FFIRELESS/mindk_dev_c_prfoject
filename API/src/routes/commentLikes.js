const router = require("express").Router();
const asyncHandler = require("express-async-handler");
// const authMiddleware = require("../middlewares/authMiddleware");
const likesController = require("../controller/commentLikes");

router.post("/", asyncHandler(likesController.createCommentLike));
router.get("/", asyncHandler(likesController.getAllCommentsLikes));
router.get("/:id", asyncHandler(likesController.getCommentLikeById));
router.get(
  "/comment/:id",
  asyncHandler(likesController.getCommentLikesByCommentId)
);
router.put("/:id", asyncHandler(likesController.updateCommentLike));
router.delete("/:id", asyncHandler(likesController.deleteCommentLike));

module.exports = router;
