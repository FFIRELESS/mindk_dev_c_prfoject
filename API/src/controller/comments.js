const Comment = require("../models/comment");
const CommentLikes = require("../models/commentLikes");
const User = require("../models/user");
const NotFoundException = require("../exceptions/NotFoundException");

module.exports = {
  // createComment: async (req, res) => {},
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
    await Comment.findByPk(req.params.Comment_ID, {
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
      where: { Post_ID: req.params.Post_ID },
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
  // updateComment: async (req, res) => {},
  // deleteComment: async (req, res) => {},
};
