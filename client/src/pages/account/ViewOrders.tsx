import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { BsCircleFill } from 'react-icons/bs';

interface Order {
  _id: string;
  totalAmount: number;
  orderItems: number[];
  orderStatus: string;
  orderDate: Date;
  shippingDetails: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: string;
      postal_code: string;
      state: string;
    };
    name: string;
  };
}

const ViewOrders: FC = ({}) => {
  const { userId } = useParams();

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const formatDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['order_history', userId],
    queryFn: async () => {
      const response = await axiosPrivate.get(`order/${userId}/all`);
      return response?.data;
    },
    refetchInterval: 120000,
    refetchOnWindowFocus: false,
  });

  console.log(data);

  const statusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'text-amber-500';
      case 'DELIVERED':
        return 'text-green-500';
      case 'DISPATCHED':
        return 'text-blue-500';
      case 'CANCELLED':
        return 'text-red-500';
      default:
        return 'text-white';
    }
  };

  return (
    <div>
      {!isLoading ? (
        !error ? (
          <div className='grid grid-cols-1 lg:grid-cols-2'>
            {data?.orders?.map((order: Order) => (
              <div
                key={order._id}
                className='mb-8 flex  flex-col divide-y-2 divide-zinc-800 rounded-md border-b-2  border-r-2 border-zinc-900  bg-gradient-to-br  from-zinc-900 px-8  py-6 shadow-lg lg:ml-6 lg:mt-0 '
              >
                <div className='space-y-4 '>
                  <div className=' space-y-1'>
                    <p className=' font-light uppercase italic tracking-wider text-zinc-500'>
                      # Order Id
                    </p>
                    <p className='text-lg  uppercase  tracking-wider '>
                      {order._id}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className=' font-light uppercase italic tracking-wider text-zinc-500'>
                      # Delivery Date
                    </p>
                    <p className=' text-lg uppercase  tracking-wider '>
                      {formatDate.format(new Date(order.orderDate))}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className=' font-light uppercase italic tracking-wider text-zinc-500'>
                      # Order Status
                    </p>
                    <p className='flex items-center space-x-2 text-lg uppercase tracking-wider '>
                      <BsCircleFill
                        className={`${statusColor(order.orderStatus)} h-2 w-2`}
                      />
                      <span>{order.orderStatus}</span>
                    </p>
                  </div>
                </div>
                <div className='mt-4 flex h-full flex-col justify-between space-y-8 py-4 '>
                  <div className='space-y-1'>
                    <p className=' text-lg font-medium uppercase italic tracking-wider text-zinc-500'>
                      # Paid
                    </p>
                    <p className='text-2xl uppercase tracking-wider '>
                      ₹ {order.totalAmount}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      navigate(`${order._id}`);
                    }}
                    className='rounded-sm bg-white px-4 py-2 font-medium text-black'
                  >
                    View Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='flex items-center justify-center text-2xl font-medium uppercase tracking-wider'>
            Error fetching products.
          </p>
        )
      ) : (
        <p className='flex animate-pulse items-center justify-center text-2xl font-medium uppercase tracking-wider'>
          Fetching Orders...
        </p>
      )}
    </div>
  );
};

export default ViewOrders;
