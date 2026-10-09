import { Link } from "react-router-dom";
import useChallenges from "../hooks/useChallenges";
import ChallngeCard from "../components/challenge/ChallengeCard";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import StatusPill from "../components/challenge/StatusPill";
import { POST_STATUSES } from "../types";
import EmptyState from "../components/ui/EmptyState";
import StatusBoard from "../components/plan/StatusBoard";
import type { ChallengeStats } from "../types";
import useAuth from "../hooks/useAuth";

// order for challenges active upcoming completed
const statusOrder: Record<ChallengeStats['challengeStatus'], number> = {
  active: 0,
  upcoming: 1,
  completed: 2,
};

// getGreeting for morning, afternoon, evening likle Good evening Essence
function getGreeting(): string {
  // getHours() in current timezone
  const hour = new Date().getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// New Challenge link 
const newChallengeLinkClasses = 'inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-ink transition hover:bg-accent';

// placeholder check if routes work


function Dashboard() {

    // get logged-in user from COntext
    const { user } = useAuth()

    // useChallenge hook
  const { challenges, loading, error, refetch } = useChallenges();

    // get todays date for User
    const todayLabel = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    // .filter summary stats for challenges
    const activeCount = challenges.filter(
      (challenge) => challenge.stats?.challengeStatus === 'active'
    ).length;

    // .reduce
    const totalPosted = challenges.reduce(
      (sum, challenge) => sum + (challenge.stats?.postedCount ?? 0),
      0
    );

    // highest streak or closest to reaching goal Math.max
    const topStreak = challenges.reduce(
      (best, challenge) => Math.max(best, challenge.stats?.currentStreak ?? 0), 
      0
    );

    // sort challenge active first
    const sortedChallenges = [...challenges].sort((a, b) => {
      const aOrder = a.stats ? statusOrder[a.stats.challengeStatus] : 3;
      const bOrder = b.stats ? statusOrder[b.stats.challengeStatus] : 3;
      return aOrder - bOrder;
    });

    const hasChallenges = !loading && !error && challenges.length > 0;
    const isEmpty = !loading && !error && challenges.length === 0;

  return (
    <div className="flex flex-col gap-6">
      {/* header Good evening/afternnon + start new challenge button */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-brand-dark">{todayLabel}</p>
          <h1 className="text-3xl font-extrabold text-orange-500 sm:text-4xl">{getGreeting()}, {user?.username}</h1>
        </div>

        <Link to="/challenges/new" className={newChallengeLinkClasses}>
          Start New Challenge
        </Link>
        
      </div>

     
      {/* loading state */}
      {loading && <Loader label="Loading your challenges..." />}

      {/* error state */}
       {!loading && error && <ErrorMessage message={error} onRetry={refetch} />}

      {/* status pill  */}
      <div className="flex flex-wrap gap-2">
        {POST_STATUSES.map((status) => (
          <StatusPill key={status} status={status} />
        ))}
      </div>

      

     {/* empty state for new users with no challenges yet  */}

     {isEmpty && (
      <EmptyState 
          title="No challenges started yet"
          message="Plan your first content challenge and reach your goals"
          action={
            <Link to="/challenges/new" className="font-semibold text-brand-dark underline">
              Create a challenge
            </Link>
          }
         /> 
     )}

    {/* stats + challenge card */}
    {hasChallenges && (
      <>
        <section aria-label="Summary" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatusBoard label='Active challenges' value={activeCount} />
          <StatusBoard label="Posts published" value={totalPosted} />
          <StatusBoard label="Top current streak" value={`${topStreak} ${topStreak === 1 ? 'day' : 'days'}`} />
        </section>

        {/* challenge card */}
        <section aria-labelledby="challenges-heading" className="flex flex-col gap-4">
          <h2 id="challenges-heading" className="text-xl font-bold text-ink">Your Challenges <span className="text-gray-500">({challenges.length})</span>
          </h2>

          {/* 1 col on mobile 3 on desktop */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedChallenges.map((challenge) => (
              <ChallengeCard key={challenge._id} challenge={challenge} />
            ))}
          </div>
        </section>
      </>
      )
    }


      {/* {!loading && !error && challenges.length === 0 && (
        <EmptyState 
          title="No challenges started yet"
          message="Plan your first content challenge and reach your goals"
          action={<Link to="/challenges/new" className="font-semibold text-brand-dark underline">Create a challenge</Link>}
        />
      )}

      {!loading && !error && challenges.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:gric-cols-3">
          {challenges.map((challenge) => (
            <ChallngeCard key={challenge._id} challenge={challenge} />
          ))} */}

    </div>
  );
}

export default Dashboard;