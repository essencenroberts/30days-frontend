import { Link } from "react-router-dom";
import useChallenges from "../hooks/useChallenges";
import ChallngeCard from "../components/challenge/ChallengeCard";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import StatusPill from "../components/challenge/StatusPill";
import { POST_STATUSES } from "../types";
import EmptyState from "../components/ui/EmptyState";


// placeholder check if routes work


function Dashboard() {

    // useChallenge hook
  const { challenges, loading, error, refetch } = useChallenges();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="p-8 text-3xl font-bold">Dashboard test</h1>

      {/* status pill  */}
      <div className="flex flex-wrap gap-2">
        {POST_STATUSES.map((status) => (
          <StatusPill key={status} status={status} />
        ))}
      </div>

      {loading && <Loader label="Laoding you challenges..." />}

      {!loading && error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && challenges.length === 0 && (
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
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;