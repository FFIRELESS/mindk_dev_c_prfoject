import { Post } from '../../components/Post';

export var PostContainer = function ({
  postHeader, postImg, postText, postAuthor,
}) {
  const header = `${postHeader}!`;
  const text = `Today ${postText}`;
  const author = `${postAuthor} //2021`;

  return <Post postHeader={header} postImg={postImg} postText={text} postAuthor={author} />;
};
