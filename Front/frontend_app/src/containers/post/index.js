import { useMutation, useQuery } from 'react-query';
import { styled } from '@mui/material/styles';
import { Post } from '../../components/post';
import { deletePost, getPosts } from './api/crud';
import ResponsiveAppBar from '../../components/header/navbar';
import CircleLoader from '../../components/header/circleLoader';

const PostContainer = function () {
  const { isFetching: isFetchingPosts, data: dataPosts } = useQuery('posts', () => getPosts());
  const posts = dataPosts?.data || [];

  const { mutate, isLoading } = useMutation(deletePost);

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <>
      <ResponsiveAppBar />
      <Offset />
      {isFetchingPosts && isLoading && <CircleLoader />}
      {posts.map((post) => <div key={post.Post_ID}><Post post={post} mutate={mutate} /></div>)}
    </>
  );
};

export default PostContainer;
