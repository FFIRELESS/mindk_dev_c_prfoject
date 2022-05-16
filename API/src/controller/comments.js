const Comment = require("../models/comment");
const CommentLikes = require("../models/commentLikes");
const User = require("../models/user");
const NotFoundException = require("../exceptions/NotFoundException");

module.exports = {
  createComment: async (req, res) => {
    const comment = new Comment(req.body);
    console.log(req.body);
    await comment.save().then(() => {
      return res.send("Comment inserting OK");
    });
  },

  getAllComments: async (req, res) => {
    await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["User_ID", "Username", "Image"],
        },
        {
          model: Comment,
          as: "Repl_to_Comment",
          attributes: ["Comment_ID"],
          include: [
            {
              model: User,
              attributes: ["User_ID", "Username", "Image"],
            },
          ],
        },
        {
          model: CommentLikes,
          attributes: ["id"],
          include: {
            model: User,
            as: "Liked_by_User",
            attributes: ["User_ID", "Username", "Image"],
          },
        },
      ],
    }).then((data) => {
      if (!data) {
        throw new NotFoundException("Not found");
      }
      res.send(data);
    });
  },
  getCommentById: async (req, res) => {
    await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["User_ID", "Username", "Image"],
        },
        {
          model: Comment,
          as: "Repl_to_Comment",
          attributes: ["Comment_ID"],
          include: [
            {
              model: User,
              attributes: ["User_ID", "Username", "Image"],
            },
          ],
        },
        {
          model: CommentLikes,
          attributes: ["id"],
          include: {
            model: User,
            as: "Liked_by_User",
            attributes: ["User_ID", "Username", "Image"],
          },
        },
      ],
    }).then((data) => {
      if (!data) {
        throw new NotFoundException("Not found");
      }
      res.send(data);
    });
  },
  getCommentsByPostId: async (req, res) => {
    await Comment.findAll({
      where: { Post_ID: req.params.id },
      include: [
        {
          model: User,
          attributes: ["User_ID", "Username", "Image"],
        },
        {
          model: Comment,
          as: "Repl_to_Comment",
          attributes: ["Comment_ID"],
          include: [
            {
              model: User,
              attributes: ["User_ID", "Username", "Image"],
            },
          ],
        },
        {
          model: CommentLikes,
          attributes: ["id"],
          include: {
            model: User,
            as: "Liked_by_User",
            attributes: ["User_ID", "Username", "Image"],
          },
        },
      ],
    }).then((data) => {
      if (!data[0]) {
        throw new NotFoundException("Not found");
      }
      res.send(data);
    });
  },
  updateComment: async (req, res) => {
    await Comment.update(req.body, {
      where: { Comment_ID: req.params.id },
    }).then((success) => {
      if (success[0]) {
        res.send("Comment updating OK");
      } else {
        throw new NotFoundException("Comment does not exist");
      }
    });
  },
  deleteComment: async (req, res) => {
    await Comment.destroy({
      where: { Comment_ID: req.params.id },
    }).then((success) => {
      if (success) {
        res.send("Comment deleting OK");
      } else {
        throw new NotFoundException("Comment does not exist");
      }
    });
  },
};
