import PropTypes from "prop-types";

export var Post = function ({posts}) {
  return (
      <div className="container">
          {
              posts.map(({Post_ID, User_ID, Title, Text, Timestamp, Visibility}) =>
              (<div className="Post-card" key={Post_ID}>
                  Post #{Post_ID} User #{User_ID} <b>{Title}</b>
                  <div> {Text} </div>
                  <div> {Timestamp} </div>
                  <div>{Visibility} </div> <br/>
              </div>))
          }
      </div>
  );
};

Post.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        Post_ID: PropTypes.number.isRequired,
        User_ID:  PropTypes.number.isRequired,
        Title:  PropTypes.string.isRequired,
        Text:  PropTypes.string.isRequired,
        Timestamp:  PropTypes.string.isRequired,
        Visibility:  PropTypes.string.isRequired
    }))
}
