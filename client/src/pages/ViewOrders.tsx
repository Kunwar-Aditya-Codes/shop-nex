import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

interface ViewOrdersProps {}

const ViewOrders: FC<ViewOrdersProps> = ({}) => {
  const { userId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['order_history'],
    queryFn: async () => {
      const response = await axiosPrivate.get(`order/${userId}/all`);
      return response?.data;
    },
    refetchInterval: 120000,
    refetchOnWindowFocus: false,
  });

  if (!isLoading && !error) {
    console.log(data);
  }
  return <div>ViewOrders</div>;
};

export default ViewOrders;
