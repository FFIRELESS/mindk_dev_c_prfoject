import PropTypes from 'prop-types';

export const userPostsContainerPropTypes = {
  // data: PropTypes.arrayOf(PropTypes.shape({
  //   Post_ID: PropTypes.number.isRequired,
  //   User_ID: PropTypes.number.isRequired,
  //   Title: PropTypes.string.isRequired,
  //   Timestamp: PropTypes.string.isRequired,
  //   Text: PropTypes.string.isRequired,
  //   Visibility: PropTypes.string.isRequired,
  //   Image: PropTypes.string,
  //   User: PropTypes.shape({
  //     User_ID: PropTypes.number.isRequired,
  //     Username: PropTypes.string.isRequired,
  //     Image: PropTypes.string.isRequired,
  //   }),
  // })),
  fetchNextPage: PropTypes.func,
  refetch: PropTypes.func,
  hasNextPage: PropTypes.bool,
  isFetching: PropTypes.bool,
  isFetchingNextPage: PropTypes.bool,
  isRefetching: PropTypes.bool,
};
