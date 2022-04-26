const Post = require("../models/post");
const User = require("../models/user");
const PostLikes = require("../models/postLikes");
const Comment = require("../models/comment");
const CommentLikes = require("../models/commentLikes");

module.exports = {
  createPost: async (req) => {
    const post = new Post({
      User_ID: req.body.User_ID,
      Title: req.body.Title,
      Text: req.body.Text,
      Visibility: req.body.Visibility,
      Image: req.file !== undefined ? req.file.filename : null,
    });
    return await post.save();
  },

  updatePost: async (req) => {
    let data;
    if (req.file !== undefined) {
      data = {
        // User_ID: req.body.User_ID,
        Title: req.body.Title,
        Text: req.body.Text,
        Visibility: req.body.Visibility,
        Image: req.file.filename,
      };
    } else {
      data = {
        // User_ID: req.body.User_ID,
        Title: req.body.Title,
        Text: req.body.Text,
        Visibility: req.body.Visibility,
      };
    }
    return await Post.update(data, { where: { Post_ID: req.params.Post_ID } });
  },

  deletePost: async (id) => {
    return await Post.destroy({ where: { Post_ID: id } });
  },

  deletePostImage: async (id) => {
    return await Post.update({ Image: null }, { where: { Post_ID: id } });
  },

  getAllPosts: async () => {
    return await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["Username", "Fullname", "Image"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["Username", "Fullname", "Image"],
            },
            {
              model: CommentLikes,
              attributes: ["Liked_by_User_ID"],
            },
          ],
        },
        {
          model: PostLikes,
          attributes: ["Like_User_ID"],
        },
      ],
      order: [["Timestamp", "DESC"]],
    });
  },

  getPostsByUserId: async (id) => {
    return await Post.findAll({
      where: { User_ID: id },
      include: [
        {
          model: User,
          attributes: ["Username", "Fullname", "Image"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["Username", "Fullname", "Image"],
            },
            {
              model: CommentLikes,
              attributes: ["Liked_by_User_ID"],
            },
          ],
        },
        {
          model: PostLikes,
          attributes: ["Like_User_ID"],
        },
      ],
      order: [["Timestamp", "DESC"]],
    });
  },

  getPostById: async (id) => {
    return await Post.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["Username", "Fullname", "Image"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["Username", "Fullname", "Image"],
            },
            {
              model: CommentLikes,
              attributes: ["Liked_by_User_ID"],
            },
          ],
        },
        {
          model: PostLikes,
          attributes: ["Like_User_ID"],
        },
      ],
    });
  },

  getPostImage: async (id) => {
    return await Post.findByPk(id, {
      attributes: ["Image"],
    });
  },
};
