const CommentLikes = require("../models/commentLikes");

module.exports = {
  createCommentLike: async (req, res) => {
    const like = new CommentLikes(req.body);
    await like.save().then(() => {
      return res.send("Like created");
    });
  },
  getAllCommentsLikes: async (req, res) => {
    await CommentLikes.findAll().then((data) => {
      if (data) {
        return res.send(data);
      }
      res.send([]);
    });
  },
  getCommentLikeById: async (req, res) => {
    await CommentLikes.findOne({ where: { id: req.params.id } }).then(
      (data) => {
        if (data) {
          return res.send(data);
        }
        res.send({});
      }
    );
  },
  getCommentLikesByCommentId: async (req, res) => {
    await CommentLikes.findAll({ where: { Comment_ID: req.params.id } }).then(
      (data) => {
        if (data) {
          return res.send(data);
        }
        res.send([]);
      }
    );
  },
  updateCommentLike: async (req, res) => {
    await CommentLikes.update(req.body, { where: { id: req.params.id } }).then(
      (success) => {
        if (success[0]) {
          return res.send("Like updating OK");
        }
        res.send("Like not found");
      }
    );
  },
  deleteCommentLike: async (req, res) => {
    await CommentLikes.destroy({ where: { id: req.params.id } }).then(
      (success) => {
        if (success) {
          return res.send("Like deleting OK");
        }
        res.send("Like not found");
      }
    );
  },
};
