export var Post = function ({
  postHeader, postImg, postText, postAuthor,
}) {
  return (
    <div>
      <p><b>{postHeader}</b></p>
      <p>{postImg}</p>
      <p>{postText}</p>
      <p><i>{postAuthor}</i></p>
    </div>
  );
};
