// usePost to one  post by its id - for the edit page

import type { Post } from "../types";
import useFetch from "./useFetch";


function usePost(challengeId?: string, postId?: string) {

  const url = challengeId && postId ? `/challenges/${challengeId}/posts/${postId}`: null;

  const { data, loading, error, refetch } = useFetch<Post>(url);


  return { post: data, loading, error, refetch };
}

export default usePost;