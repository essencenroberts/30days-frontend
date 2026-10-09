// this page  will show calendar and everyday of challenge and the corresponding post with a list view, grid view and board view like kanban + progress bar and name dates and edit and add post buttons

import { Link, useParams } from "react-router-dom";
import useChallenge from "../hooks/useChallenge";
import usePosts from "../hooks/usePosts";
import { useState } from "react";
import ErrorMessage from "../components/ui/ErrorMessage";
import { groupPostsByDay } from "../utils/post";
import { formatDate } from "../utils/dates";
import ProgressBar from "../components/challenge/ProgressBar";
import ViewToggle from "../components/plan/ViewToggle";
import PlanList from "../components/plan/PlanList";
import PlanGrid from "../components/plan/PlanGrid";
import PlanBoard from "../components/plan/PlanBoard";
import Loader from "../components/ui/Loader";
import Streak from "../components/challenge/Streak";


type PlanView = 'grid' | 'list' | 'board';

const VIEW_OPTIONS: { value: PlanView; label: string }[] = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
  { value: 'board', label: 'Board' },
];

function ChallengePlan() {
  const { challengeId } = useParams<{ challengeId: string}>();

  // load challenges and posts
  const challengeData = useChallenge(challengeId);
  const postsData = usePosts(challengeId);

  // useState views
  const [view, setView] = useState<PlanView>('grid');

  // loading + errors state
  if (challengeData.loading || postsData.loading) {
    return <Loader label="Loading your plan..." />;
  }

  const loadError = challengeData.error || postsData.error;
  const {challenge } = challengeData

  if (loadError || !challenge) {
    return (
      <ErrorMessage 
        message={loadError || 'Challenge Not Found'}
        onRetry={() => {
          challengeData.refetch();
          postsData.refetch();
        }}
      />
    );
  }

  // data for views
  const { posts } = postsData;
  const postsByDay = groupPostsByDay(posts);
  const { stats } = challenge;

  // Add post button + todays day
  const todayDayNumber = stats?.todayDayNumber ?? 0;
  const isTodayInRange = todayDayNumber >= 1 && todayDayNumber <= challenge.lengthInDays;
  const defaultDay = isTodayInRange ? todayDayNumber : 1;

  return (
    <div>
      <div>
        <div>
          <Link to="/dashboard" 
            className='text-sm font-semibold text-brand-dark hover:underline'
          >
            <span aria-hidden="true">👈🏾</span> All challenges
          </Link>
          <h1>{challenge.challengeName}</h1>
          <p className="mt-1 text-gray-600">
            {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)} * {challenge.postsPerDay}{' '}
            {challenge.postsPerDay === 1 ? 'post' : 'posts'}/day
          </p>
        </div>

        <div>
          <Link
            to={`/challenges/${challenge._id}/edit`}
            className="inline-flex min-h-11 items-center rounded-full border-2 border-ink px-5 text-sm font-semibold hover:bg-gray-100"
          >
            Edit
          </Link>
          <Link
            to={`/challenges/${challenge._id}/posts/new?day=${defaultDay}`}
            className="inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-ink hover:bg-accent"
          >
            Add Post
          </Link>
        </div>
      </div>

      {/* Progress stats */}
      {stats && (
        <section>
          <div>
            <p>
              {stats.postedCount} of {stats.totalPostGoal} posted
              <span>{stats.progressPercent}%</span>
            </p>

            <div>
              {isTodayInRange && (
                <span>
                  Day {todayDayNumber} of {challenge.lengthInDays}
                </span>
              )}

              <Streak current={stats.currentStreak} best={stats.bestStreak} />
            </div>
          </div>
          <ProgressBar percent={stats.progressPercent} label={`${challenge.challengeName} progress`} />
        </section>
      )}

      {/*  switch views */}
      <ViewToggle label="Plan view" options={VIEW_OPTIONS} value={view} onChange={setView}/>

      {/* active view */}
      {view === 'grid' && <PlanGrid challenge={challenge} postsByDay={postsByDay} />}
      {view === 'list' && <PlanList challenge={challenge} postsByDay={postsByDay} />}
      {view === 'board' && <PlanBoard posts={posts} />}
    </div>
  );
}

export default ChallengePlan;