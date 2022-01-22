import { Post } from '../../components/Post';
import {useQuery} from "react-query";
import {getPosts} from "./api/crud";
import {Link} from "react-router-dom";

const PostContainer = () => {
  const {isFetching, data} = useQuery('posts', () => getPosts());

  const posts = data?.data || [];

  return <>
    {isFetching && <div>Loading...</div>}
    <Post posts={posts}/>
    <Link to="/"><button>GO TO MAIN PAGE</button></Link>
    </>;
};

export default PostContainer;
