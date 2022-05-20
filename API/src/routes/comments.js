const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const commentsController = require("../controller/comments");

const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", asyncHandler(commentsController.getAllComments));
router.get("/:id", asyncHandler(commentsController.getCommentById));
router.get("/post/:id", asyncHandler(commentsController.getCommentsByPostId));

router.use(authMiddleware);

router.post("/", asyncHandler(commentsController.createComment));
router.put("/:id", asyncHandler(commentsController.updateComment));
router.delete("/:id", asyncHandler(commentsController.deleteComment));

module.exports = router;
