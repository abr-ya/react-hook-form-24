import { usePosts } from "./services/queries";

const BlogPosts = () => {
  const postsQuery = usePosts();
  console.log(postsQuery.data);

  return <div>BlogPosts {postsQuery.data?.length}</div>;
};

export default BlogPosts;
