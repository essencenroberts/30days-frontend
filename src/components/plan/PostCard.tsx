// post cardw ill show one post with status, platform, and time  and click ing it opens the post editor

import { Link } from "react-router-dom";
import type { Post } from "../../types";
import { formatTime } from "../../utils/dates";
import StatusPill from "../challenge/StatusPill";


interface PostCardProps {
  post: Post;
  showDay?: boolean;
}

function PostCard({ post, showDay = false }: PostCardProps) {
  return (
    <Link
      to={`/challenges/${post.challenge}/posts/${post._id}`}
      className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-4 transition hover"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-ink">{post.title}</h3>
        <StatusPill status={post.status} />
      </div>

      <p>
        {showDay && <>Day {post.dayNumber} · </>}
        {post.platform} · {post.contentType}
        {post.postTime && <> · {formatTime(post.postTime)}</>}
      </p>
    
    </Link>
  )
}

export default PostCard;