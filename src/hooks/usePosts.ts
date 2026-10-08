// usePost to get all post for one challenge

import type { Post } from "../types";
import useFetch from "./useFetch";

// usePosts
function usePosts(challengeId?: string) {

  const url = challengeId ? `/challenges/${challengeId}/posts` : null;

  const { data, setData, loading, error, refetch } = useFetch<Post[]>(url);

  return { posts: data ?? [], setPosts: setData, loading, error, refetch }; 
}

export default usePosts;