import { useQuery } from 'react-query';
import { styled } from '@mui/material/styles';
import { Post } from '../../components/post';
import { getPosts } from './api/crud';
import ResponsiveAppBar from '../../components/header/navbar';
import CircleLoader from '../../components/header/circleLoader';

const PostContainer = function () {
  const { isFetching: isFetchingPosts, data: dataPosts } = useQuery('posts', () => getPosts());
  const posts = dataPosts?.data || [];

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <>
      <ResponsiveAppBar />
      <Offset />
      {isFetchingPosts && <CircleLoader />}
      {posts.map((post) => <div key={post.post.Post_ID}><Post post={post} /></div>)}
    </>
  );
};

export default PostContainer;
