const PostLikes = require("../models/postLikes");

module.exports = {
  createPostLike: async (req, res) => {
    const like = new PostLikes(req.body);
    await like.save().then(() => {
      return res.send("Like created");
    });
  },
  getAllPostLikes: async (req, res) => {
    await PostLikes.findAll().then((data) => {
      if (data) {
        return res.send(data);
      }
      res.send([]);
    });
  },
  getPostLikeById: async (req, res) => {
    await PostLikes.findOne({ where: { id: req.params.id } }).then((data) => {
      if (data) {
        return res.send(data);
      }
      res.send({});
    });
  },
  getPostLikesByPostId: async (req, res) => {
    await PostLikes.findAll({ where: { Post_ID: req.params.id } }).then(
      (data) => {
        if (data) {
          return res.send(data);
        }
        res.send([]);
      }
    );
  },
  updatePostLike: async (req, res) => {
    await PostLikes.update(req.body, { where: { id: req.params.id } }).then(
      (success) => {
        if (success[0]) {
          return res.send("Like updating OK");
        }
        res.send("Like not found");
      }
    );
  },
  deletePostLike: async (req, res) => {
    await PostLikes.destroy({ where: { id: req.params.id } }).then(
      (success) => {
        if (success) {
          return res.send("Like deleting OK");
        }
        res.send("Like not found");
      }
    );
  },
};
