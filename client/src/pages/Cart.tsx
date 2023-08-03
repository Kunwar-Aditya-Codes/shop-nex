import { Link } from 'react-router-dom';
import { useBoundStore } from '../app/store';
import CartCard from '../components/CartCard';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import toast from 'react-hot-toast';

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  address: string[];
  isVerified: string;
}

const Cart = () => {
  const cartItems = useBoundStore((state) => state.products);
  const totalItems = useBoundStore((state) => state.totalItems);
  const totalAmount = useBoundStore((state) => state.totalAmount);
  const userData = useBoundStore((state) => state.user) as UserData;
  const clearCart = useBoundStore((state) => state.clearCart);

  const { id } = useAuth();

  const orderItems = cartItems.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
  }));

  const axiosPrivate = useAxiosPrivate();

  const buy = async () => {
    toast.loading('Processing checkout', {
      id: 'payment',
    });

    if (!id) {
      toast.error('Login to pay!', {
        id: 'payment',
      });
      return;
    }

    const orderResponse = await axiosPrivate.post(`/order/${id}/create`, {
      orderItems,
      totalAmount,
    });

    const response = await axiosPrivate.post(`/session/${id}/checkout`, {
      orderItems: cartItems,
      customerEmail: userData.email,
      orderId: orderResponse.data.newOrderId,
    });

    if (response.data.url) {
      toast.dismiss('payment');
      window.location.href = response.data.url;
      clearCart();
    } else {
      toast.error('Error processing , try again!', {
        id: 'payment',
      });
      return;
    }
  };

  return (
    <div className='mx-auto flex h-full w-full max-w-7xl flex-grow flex-col items-center space-y-8 p-6 lg:flex-row-reverse lg:items-start lg:space-y-0'>
      <div className='flex w-full items-center justify-center lg:flex-[0.5]  lg:justify-end'>
        <div className=' flex w-full flex-col  space-y-4 rounded-md  border border-zinc-900 p-4 shadow-lg lg:w-[25rem] '>
          <h1 className='text-2xl font-semibold uppercase tracking-wide  text-zinc-700 '>
            Cart Summary
          </h1>
          <p className='text-start  font-light tracking-wider'>
            Total Items: <span className=''>{totalItems}</span>
          </p>
          <p className='text-start  font-light tracking-wider'>
            Total Amount: <span className=''> ${totalAmount}</span>
          </p>
          <button
            onClick={buy}
            disabled={totalAmount === 0 || !id}
            className='rounded-md bg-white/75 py-2 font-medium uppercase tracking-wider text-black transition ease-out hover:bg-white disabled:cursor-not-allowed disabled:bg-zinc-900 disabled:text-zinc-800'
          >
            Process to pay
          </button>
        </div>
      </div>
      <div className='grid w-full  grid-cols-1 divide-y-2 divide-zinc-900 lg:flex-[0.5] '>
        {cartItems.length > 0 ? (
          cartItems?.map((product) => (
            <CartCard
              price={product.price}
              key={product.id}
              rating={product.rating}
              productId={product.id}
              productImage={product.image}
              productName={product.name}
              quantity={product.quantity}
            />
          ))
        ) : (
          <div className='flex flex-col items-center space-y-8  h-full  lg:items-start'>
            <p className='text-lg font-medium uppercase tracking-widest'>
              Cart looks empty :&#40;
            </p>
            <Link
              to='/products'
              className='rounded-md bg-white px-4 py-2 text-black'
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
