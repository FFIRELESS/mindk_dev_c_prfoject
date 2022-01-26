import { Post } from '../../components/Post';
import {useQuery} from "react-query";
import {getPosts} from "./api/crud";
import {Link} from "react-router-dom";
import ResponsiveAppBar from "../../components/header/navbar";
import {styled} from "@mui/material/styles";

const PostContainer = () => {
  const {isFetching: isFetchingPosts, data: dataPosts} = useQuery('posts', () => getPosts());
  // const {isFetching: isFetchingUsers, data: dataUsers} = useQuery('users', () => getUsers());

  const posts = dataPosts?.data || [];
  // const users = dataUsers?.data || [];

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
      <>
          <ResponsiveAppBar/>
          <Offset />
          {isFetchingPosts && <div>Loading...</div>}
          {
            posts.map((posts) => <div key={posts.Post_ID}><Post posts={posts}/></div>)
          }
          <Link to="/"><button>GO TO MAIN PAGE</button></Link>
      </>
  );
};

export default PostContainer;
