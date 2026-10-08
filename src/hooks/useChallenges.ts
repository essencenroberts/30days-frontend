
import type { Challenge } from "../types";
import { getTodayString } from "../utils/dates";
import useFetch from "./useFetch";

// fetch data 
  // fetch all logged in user's challenges and show their stats
  // const { challenges, loading, error, refetch } useFetch<Challenge[]>
function useChallenges() {
  const { data, loading, error, refetch } = useFetch<Challenge[]>(`/challenges?today=${getTodayString()}`);

  return { challenges: data ?? [], loading, error, refetch };
}

export default useChallenges;