// daycell will be a peice of the calendar grid view thats a day;s post and count toward the daily goal

import { Link } from "react-router-dom";
import type { Post } from "../../types";
import { formatDate } from "../../utils/dates";

interface DayCellProps {
  challengeId: string;
  dayNumber: number;
  date: string;
  posts: Post[];
  postPerDay: number; // daily goal
  isToday: boolean;
}

function DayCell({ challengeId, dayNumber, date, posts, postPerDay, isToday }: DayCellProps) {
  
  // shows how many posts have been posted to reach daily goal
  const postedCount = posts.filter((post) => post.status === 'posted').length;
  const isComplete = postedCount >= postPerDay;

  // today - orange compelete - green everything else gray
  let borderClass = 'border-gray-200';
  if (isComplete) borderClass = 'border-green-500';
  if (isToday) borderClass = 'border-brand ring-2 ring-brand-light';

  return(
    // grid is order list of days
    <li className={`flex min-h-36 flex-col gap-2 rounded-2xl border-2 bg-white p-3 ${borderClass}`}>
      {/* top shows day number of challenge + date */}
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-bold text-ink">Day {dayNumber}</span>
        <span className="text-xs text-gray-500">{formatDate(date)}</span>
      </div>

      {/* today label */}
      {isToday && (
        <span className="w-fit rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-ink">Today</span>
      )}

      {/*  daily goal progress */}
      <p className={`text-xs font-semibold ${isComplete ? 'text-green-700' : 'text-gray-600'}`}>
        {postedCount} of {postPerDay} posted
      </p>

      {/* this day's posts */}
      {posts.length > 0 && (
        <ul className="flex flex-cols gap-1">
          {posts.map((post) => (
            <li key={post._id}>
              <Link
                to={`/challenges/${challengeId}/posts/${post._id}`}
                className="block truncate text-sm text-ink hover:text-brand-dark hover:underline"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        to={`/challenges/${challengeId}/posts/new?day=${dayNumber}`}
        className="mt-auto text-sm font-semibold text-brand-dark hover:underline"
        aria-label={`Add a post to day ${dayNumber}`}
      >
        Add Post
      </Link>
    </li>
  );
}

export default DayCell;