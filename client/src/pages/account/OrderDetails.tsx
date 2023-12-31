import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

interface OrderDetailsProps {}

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

const OrderDetails: FC<OrderDetailsProps> = ({}) => {
  const { orderId } = useParams();

  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading } = useQuery({
    queryKey: ['order_history', orderId],
    queryFn: async () => {
      const response = await axiosPrivate.get(`order/${orderId}`);
      return response?.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const orderDetails: Order = data?.order;

  
  return (
    <div>
      {isLoading ? (
        <p>Loading order details...</p>
      ) : (
        <div className='space-y-8  px-2 lg:ml-6'>
          <div className='flex flex-col space-y-1'>
            <span className='text-lg font-bold tracking-wider'># Order ID</span>
            <span className='text-zinc-400'>{orderDetails._id}</span>
          </div>
          <div className='flex flex-col space-y-1'>
            <span className='text-lg font-bold tracking-wider'>
              # Shipping Details
            </span>
            <div className='flex flex-col text-zinc-400'>
              <span>{orderDetails?.shippingDetails?.name}</span>
              <span>{orderDetails?.shippingDetails?.address.line1}</span>
              <span>{orderDetails?.shippingDetails?.address.line2}</span>
            </div>
          </div>
          <div className='flex flex-col space-y-1'>
            <span className='text-lg font-bold tracking-wider'>
              # Amount Paid
            </span>
            <span className='text-zinc-400'>₹ {orderDetails.totalAmount}</span>
          </div>
          <div className='flex flex-col space-y-2'>
            <span className='text-lg font-bold tracking-wider'># Products</span>
            {orderDetails?.orderItems.map((product: any) => (
              <div
                key={product.productId._id}
                className='flex items-start space-x-4 '
              >
                <img
                  src={product.productId.productImage}
                  alt={product?.productId.productName}
                  className='h-[6rem] w-[10rem] rounded-md'
                />
                <div className='mt-0 pt-0 text-zinc-400'>
                  <p className='text-lg tracking-wider'>
                    {product?.productId.productName}
                  </p>
                  <p className='tracking-wider'>
                    {product.productId._id.slice(-8)}
                  </p>
                  <div className='flex items-center space-x-2'>
                    <p>Quantity:</p>
                    <p>{product.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
