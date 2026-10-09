// placeholder check if routes work /challenges/new - this page creates a new challenge

import { useNavigate } from "react-router-dom";
import api from "../api/client";
import type { Challenge, NewChallengeData } from "../types";
import ChallengeForm from "../components/challenge/ChallengeForm";



function NewChallenge() {
  const navigate = useNavigate();

  // handleCreate
  async function handleCreate(challengeDate: NewChallengeData) {
    // POST /api/challenges 
    const response = await api.post<Challenge>('/challenges', challengeDate);

    // go to new challenge plan
    navigate(`/challenges/${response.data._id}`);
  }

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadows-sm sm:p-8">
      <h1 className="p-8 text-3xl font-extrabold text-orange-500">New Challenge</h1>
      <p className="mt-2 mb-6 text-gray-400">Pick how man days your challenge will be. You can change this later</p>

      <ChallengeForm submitLabel="Create challenge" cancelTo="/dashboard" onSubmit={handleCreate} />
    </div>
  );

}

export default NewChallenge;