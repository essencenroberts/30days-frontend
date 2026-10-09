// get 1 challenge by ID and show stats
import type { Challenge } from "../types";
import { getTodayString } from "../utils/dates";
import useFetch from "./useFetch";


// challengeUd?
function useChallenge(challengeId?: string) {
  const url = challengeId ? `/challenges/${challengeId}?today=${getTodayString()}` : null;

  const { data, setData, loading, error, refetch } = useFetch<Challenge>(url);

  return { challenge: data, setChallenge: setData, loading, error, refetch };


}

export default useChallenge;