import { seParams, useNavigate, useParams } from "react-router-dom";
import useChallenge from "../hooks/useChallenge";
import { useState } from "react";
import ErrorMessage from "../components/ui/ErrorMessage";
import Loader from "../components/ui/Loader";
import api, { getErrorMessage } from "../api/client";
import Button from "../components/ui/Buttons";
import ChallengeForm from "../components/challenge/ChallengeForm";
import type { NewChallengeData } from "../types";


function EditChallenge() {
  // useParams
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();

  // load challenges we're editing
  const { challenge, loading, error, refetch } = useChallenge(challengeId);

  // delete states 

  const [isDeleting, setIsDeleting ] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // handler function PUT save change
  async function handleUpdate(challengeData: NewChallengeData) {
    await api.put(`/challenges/${challengeId}`, challengeData);

    // redirect back to plan
    navigate(`/challenges/${challengeId}`);

  }

  // handle delete remove challenge and posts
  async function handleDelete() {
    // ask if they want to delete
    const confirmed = window.confirm(
      'Delete this challenge and all of its posts? This cannot be undone.'
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true)
      setDeleteError('');
      await api.delete(`/challenges/${challengeId}`);

      navigate('/dashboard', { replace: true })
    } catch (error) {
      setDeleteError(getErrorMessage(error));
      setIsDeleting(false);
    }
  }

  // loading error states
  if (loading) return <Loader label="Loading challenge..."/>;
  if (error || !challenge) {
    return <ErrorMessage message={error || 'Challenge not found.'} onRetry={refetch} />;
  }

  // starting values for form
  const initialValues: NewChallengeData = {
    challengeName: challenge.challengeName,
    description: challenge.description,
    startDate: challenge.startDate.slice(0, 10),
    lengthInDays: challenge.lengthInDays,
    postPerDay: challenge.postPerDay,

  };

  return(
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-extrabold text-ink">Edit challenge</h1>

        <p className="mt-2 mb-6 text-gray-600">
          {challenge.challengeName}
        </p>

        <ChallengeForm 
          initialValues={initialValues}
          submitLabel="Save changes"
          cancelTo={`/challenges/${challengeId}`}
          onSubmit={handleUpdate}
        />
      </div>

      <section aria-labelledby="danger-heading" className="rounded-3xl border border-red-200 bg-red-50 p-6">
        <h2 id="danger-heading" className="text-lg font-bold text-red-800">Delete Challenge</h2>

        <p className="mt-1 mb-4 text-sm text-red-700">This deletes the challenge and every post in it</p>

        {deleteError && (
          <p role="alert" className="mb-4 text-sm text-red-700">{deleteError}</p>
        )}

        <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
          Delete Challenge
        </Button>



      </section>

    </div>
  );
}

export default EditChallenge;