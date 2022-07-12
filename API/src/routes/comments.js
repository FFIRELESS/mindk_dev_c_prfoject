const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const commentsController = require("../controller/comments");

const authMiddleware = require("../middlewares/authMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");

const validationRules = require("../services/validator.config");

router.get("/", asyncHandler(commentsController.getAllComments));
router.get("/:id", asyncHandler(commentsController.getCommentById));
router.get("/post/:id", asyncHandler(commentsController.getCommentsByPostId));

router.use(authMiddleware);

router.post(
  "/",
  validationMiddleware(validationRules.commentRules),
  asyncHandler(commentsController.createComment)
);
router.put(
  "/:id",
  validationMiddleware(validationRules.commentRules),
  asyncHandler(commentsController.updateComment)
);
router.delete("/:id", asyncHandler(commentsController.deleteComment));

module.exports = router;
