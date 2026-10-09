// list view with full post details

import { Link } from "react-router-dom";
import type { Challenge, Post } from "../../types";
import { formatDate, getDayDate } from "../../utils/dates";
import PostCard from "./PostCard";



interface PlanListProps {
  challenge: Challenge;
  postsByDay: Record<number, Post[]>;
}

function PlanList({ challenge, postsByDay }: PlanListProps) {
  const dayNumbers = Array.from({ length: challenge.lengthInDays }, (_, index) => index + 1)
  const todayDayNumber = challenge.stats?.todayDayNumber;
  
  return(
    <ol>
      {dayNumbers.map((dayNumber) => {
        const dayPosts = postsByDay[dayNumber] ?? [];
        const isToday = dayNumber === todayDayNumber;

        return (
          <li key={dayNumber} className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm">
            {/* day row */}
            <div>
              <h3>Day {dayNumber}
                <span> {formatDate(getDayDate(challenge.startDate, dayNumber))}</span>
                {isToday && (
                <span>Today</span>
                )}
              </h3>
              <Link
                to={`/challenges/${challenge._id}/posts/new?day=${dayNumber}`}
                className="text-sm font-semibold text-brand-dark hover:underline"
                aria-label={`Add a post to day ${dayNumber}`}
              >Add post</Link>
              
            </div>

            {/* todays day post */}
            {dayPosts.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {dayPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ): ( 
              <p className="text-sm text-gray-500">Nothing planned yet.</p>
            )}
          </li>
        )
      })}
    </ol>
  )
}


export default PlanList;