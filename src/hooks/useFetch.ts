import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../axios';
import { selectUserInfo } from '../Store';
import { getError } from '../utiles';

const useFetch = (requestQuery: string) => {
  const [data, setData] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const userInfo = useSelector(selectUserInfo);

  const fetchData = async () => {
    if (!userInfo) {
      // Handle the case when userInfo is null
      return;
    }

    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios.get(requestQuery, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
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

export default useFetch;
