// useFetch fetch data 
  // const : data, loading, error, refetch } useFetch<Challenge[]>

import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../api/client";

// url: string 
function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(url !== null);
  const [error, setError] = useState('');

  // try agin
  const [reloadKey, setReloadKey] = useState(0);

  //useEffect
  useEffect(() => {
    if (!url) return;

    //
    const requestUrl: string = url;

    let ignore = false;

    async function load() {
      try {
        const response = await api.get<T>(requestUrl);
        if (!ignore) {
          setData(response.data);
          setError('');
        }
      } catch (err) {
        if (!ignore) setError(getErrorMessage(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    // "cleanup" f
    return () => {
      ignore = true;
    };

}, [url, reloadKey]);

// show loader , clear error 
function refetch() {
  setLoading(true);
  setError('');
  setReloadKey((key) => key + 1);

}

// return
return { data, setData, loading, error, refetch };
}

export default useFetch;