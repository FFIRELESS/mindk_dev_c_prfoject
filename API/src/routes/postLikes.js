const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const authMiddleware = require("../middlewares/authMiddleware");
const likesController = require("../controller/postLikes");

router.get("/", asyncHandler(likesController.getAllPostLikes));
router.get("/:id", asyncHandler(likesController.getPostLikeById));
router.get("/post/:id", asyncHandler(likesController.getPostLikesByPostId));

router.use(authMiddleware);

router.post("/", asyncHandler(likesController.createPostLike));
router.put("/:id", asyncHandler(likesController.updatePostLike));
router.delete("/:id", asyncHandler(likesController.deletePostLike));

module.exports = router;
