// helper for lists of posts

import type { Post } from "../types";

// group or sort post by day

export function groupPostsByDay(posts: Post[]): Record<number, Post[]> {
  const groups: Record<number, Post[]> = {};

  posts.forEach((post) => {
    // start emoty list for first post of the day
    if (!groups[post.dayNumber]) {
      groups[post.dayNumber] = [];
    }
    groups[post.dayNumber].push(post);
  });
  
  return groups;
}