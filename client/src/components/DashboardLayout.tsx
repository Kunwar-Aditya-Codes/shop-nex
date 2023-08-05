import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useBoundStore } from '../app/store';

interface DashboardLayoutProps {}

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  email: string;
  isAdmin: boolean;
  profileImage: string;
} | null;

const DashboardLayout: FC<DashboardLayoutProps> = ({}) => {
  const user = useBoundStore((state) => state.user) as User;

  return (
    <div className='mx-auto flex w-full max-w-[80rem] flex-grow flex-col p-4 md:flex-row'>
      <div className='flex flex-col rounded-md bg-zinc-900/30 font-light uppercase tracking-widest md:flex-[0.2] md:space-y-10 md:pt-8 md:text-lg'>
        <Link
          to={`/admin/${user?._id}/all_products`}
          className='w-full px-4 py-3 text-center hover:bg-zinc-900'
        >
          Products
        </Link>
        <Link
          to={`/admin/${user?._id}/sales`}
          className='w-full px-4 py-3 text-center hover:bg-zinc-900'
        >
          Sales
        </Link>
        <Link
          to={`/admin/${user?._id}/orders`}
          className='w-full px-4 py-3 text-center hover:bg-zinc-900'
        >
          Orders
        </Link>
      </div>
      <div className='flex-[0.8]'>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
