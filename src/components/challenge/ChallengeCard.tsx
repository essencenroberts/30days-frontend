// to show challenge on Dashboard with name, dates, status, progress, and streak + if they clik on it will open the plan page for that challenge
import { Link } from "react-router-dom";
import type { Challenge, ChallengeStats } from "../../types";
import { formatDate } from "../../utils/dates";
import ProgressBar from "./ProgressBar";
import Streak from "./Streak";

// words and colors for challemhe status
const challengeStatusInfo: Record<ChallengeStats['challengeStatus'], { label: string; classes: string }> = {
  upcoming: { label: 'Upcoming', classes: 'bg-gray-100 text-gray-700'},
  active: { label: 'Active', classes: 'bg-brand-light text-brand-dark' },
  completed: { label: 'Completed', classes: 'bg-green-100 text--green-800' },
};

// props
interface ChallengeCardProps {
  challenge: Challenge;
}

// function
function ChallngeCard({ challenge }: ChallengeCardProps) {

  // stats
  const { stats } = challenge;

  return (
    <Link 
      to={`/challnges/${challenge._id}`}
      className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    > 
      {/* row wih name and status  */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-ink">{challenge.challengeName}</h2>
          <p className="text-sm text-gray-600">
            {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)} * {challenge.postsPerDay}{' '}
            {challenge.postsPerDay === 1 ? 'post' : 'posts'}/day
          </p>
        </div>
        {stats && (
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${challengeStatusInfo[stats.challengeStatus].classes}`}
          >
            {challengeStatusInfo[stats.challengeStatus].label}
          </span>
        )}
      </div>

      {stats && (
        <>
          {/* progress */}
          <div>
            <div>
              <span>
                {stats.postedCount} of {stats.totalPostGoal} posted
              </span>
              
              <span>
                {stats.progressPercent}%
              </span>
            </div>
            <ProgressBar percent={stats.progressPercent} label={`${challenge.challengeName} progress`} />
          </div>

          {/* streak  */}
          <Streak current={stats.currentStreak} best={stats.bestStreak} />
          </>
        )}

    
      
    </Link>
  );
}

export default ChallngeCard;