import useAxiosPrivate from './useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
  const privateAxiosInstance = useAxiosPrivate();

  let user;

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await privateAxiosInstance.get('/customer/profile');
      return response.data;
    },
  });

  return {
    user: data,
  };
};

export default useUser;
