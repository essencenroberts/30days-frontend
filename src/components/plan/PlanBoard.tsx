// board view I want it to have drag and drop but that's for V2 for now the status will change

import { POST_STATUSES, type Post } from "../../types";
import StatusPill from "../challenge/StatusPill";
import PostCard from "./PostCard";


interface PlanBoardProps {
  posts: Post[]
}

function PlanBoard({ posts }: PlanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {POST_STATUSES.map((status) => {
        const columnPosts = posts.filter((post) => post.status === status);

        return (
          <section
            key={status}
            aria-label={`${status} posts`}
            className="flex w-64 shrink-0 flex-col gap-3 rounded-2xl bg-gray-100 p-3"
          >
            <div className="flex items-center justify-between">
              <StatusPill status={status} />
              <span className="text-sm font-semibold text-gray-600">{columnPosts.length}</span>
            </div>

            {columnPosts.length > 0 ? (
              columnPosts.map((post) => <PostCard key={post._id} post={post} showDay />) ) : (
              <p className="py-4 text-center text-sm text-gray-500">No posts</p>
            )}
          </section>
        )
      })}
    </div>
  );
}

export default PlanBoard;