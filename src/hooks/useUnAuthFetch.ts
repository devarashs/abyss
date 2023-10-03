import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import axios from '../axios';
import { getError } from '../utiles';

export const useUnAuthFetch = (requestQuery: string) => {
  const [data, setData] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchData = async () => {
    // if (!userInfo) {
    //   // Handle the case when userInfo is null
    //   return;
    // }

    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios.get(requestQuery);
      setData(response.data);

      setIsLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(true);
        toast.error(getError(err));
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};
