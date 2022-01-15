import { Post } from '../../components/Post';
import PropTypes from "prop-types";

const PostContainer = ({
  postHeader, postImg, postText, postAuthor,
}) => {
  const header = `${postHeader}!`;
  const text = `Today ${postText}`;
  const author = `${postAuthor} //2021`;

  return <Post postHeader={header} postImg={postImg} postText={text} postAuthor={author} />;
};

PostContainer.propTypes = {
  postHeader: PropTypes.string.isRequired,
  postImg: PropTypes.string,
  postText: PropTypes.string.isRequired,
  postAuthor: PropTypes.string.isRequired
}

PostContainer.defaultProps = {
  postImg: '/src/default.img'
}

export default PostContainer;
