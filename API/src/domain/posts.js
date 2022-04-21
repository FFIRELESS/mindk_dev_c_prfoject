const {
  getPostById,
  getPostWithUserById,
  getAllPosts,
  getAllPostsWithUsers,
  getPostsValue,
  countPostLikes,
} = require("../services/store/posts.service");

module.exports = {
  // create: async function (post) {
  //     const [newPostId] = await create(post);
  //     // some additional logic
  //     // send an email for example
  //     return newPostId;
  // },
  getAllPosts: async () => {
    let postData = [];
    const postValue = await getPostsValue();
    const post = await getAllPosts();
    const user = await getAllPostsWithUsers();

    for (let i = 0; i < postValue.count; i++) {
      postData[i] = {
        post: {
          ...post[i],
          user: user[i],
          // BAD PERFORMANCE!!!
          totalLikes: (await countPostLikes(i)).count,
        },
      };
    }
    return postData;
  },
  getPostById: async (id) => {
    const post = await getPostById(id);

    if (!post) {
      return null;
    }
    const user = await getPostWithUserById(post.User_ID);
    const likesTotal = await countPostLikes(post.Post_ID);

    return {
      ...post,
      user,
      likesTotal: likesTotal.count,
    };
  },
  getPostLikesById: async (id) => {
    const likesTotal = await countPostLikes(id);

    return likesTotal.count;
  },
  // updateById: async (id, data) => {
  //     await updateById(id, data);
  //     const post = getById(id);
  //     // some additional logic
  //     return post;
  // },
  // deleteById: async (id) => {
  //     await deleteById(id);
  //     // some additional logic
  // },
};
