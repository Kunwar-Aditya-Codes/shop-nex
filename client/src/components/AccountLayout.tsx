import { Link, Outlet, useParams } from 'react-router-dom';

const AccountLayout = () => {
  const { userId } = useParams();

  return (
    <div className='mx-auto flex w-full max-w-7xl flex-grow flex-col space-y-12  p-4 lg:flex-row lg:space-y-0'>
      <div className='flex flex-col space-y-6 rounded-md  px-3 py-4 lg:h-fit lg:flex-[0.2]'>
        <Link
          to={`/account/${userId}/profile`}
          className='rounded-sm border border-zinc-900 px-2 py-3 text-center  font-light uppercase tracking-widest'
        >
          Profile
        </Link>
        <Link
          to={`/account/${userId}/view_orders`}
          className='rounded-sm border border-zinc-900 px-2 py-3 text-center  font-light uppercase tracking-widest'
        >
          View Orders
        </Link>
      </div>
      <div className=' px-3 py-4 lg:flex-[0.8]'>
        <Outlet />
      </div>
    </div>
  );
};
export default AccountLayout;
