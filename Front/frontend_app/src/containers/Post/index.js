import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Post } from '../../components/Post';
import { getPosts } from './api/crud';
import ResponsiveAppBar from '../../components/header/navbar';

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
      {isFetchingPosts && <div>Loading...</div>}
      {
            posts.map((post) => <div key={post.Post_ID}><Post posts={post} /></div>)
          }
      <Link to="/"><Button>GO TO MAIN PAGE</Button></Link>
    </>
  );
};

export default PostContainer;
