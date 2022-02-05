import { useQuery } from 'react-query';
import { styled } from '@mui/material/styles';
import { Post } from '../../components/Post';
import { getPosts } from './api/crud';
import ResponsiveAppBar from '../../components/header/navbar';
import CircleLoader from '../../components/header/CircleLoader';

const PostContainer = function () {
  const { isFetching: isFetchingPosts, data: dataPosts } = useQuery('posts', () => getPosts());
  // const {isFetching: isFetchingUsers, data: dataUsers} = useQuery('users', () => getUsers());

  const posts = dataPosts?.data || [];
  // const users = dataUsers?.data || [];

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <>
      <ResponsiveAppBar />
      <Offset />
      {isFetchingPosts && <CircleLoader />}
      {posts.map((post) => <div key={post.Post_ID}><Post posts={post} /></div>)}
    </>
  );
};

export default PostContainer;
