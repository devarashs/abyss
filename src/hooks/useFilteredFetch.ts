import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import axios from '../axios';
import { getError } from '../utiles';
import { selectUserInfo } from '../Store';

export const useFilteredFetch = (requestQuery: string, filter: { frameType: string }) => {
  const [data, setData] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const userInfo = useSelector(selectUserInfo);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios.get(requestQuery, {
        params: { frameType: filter?.frameType },
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });
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
