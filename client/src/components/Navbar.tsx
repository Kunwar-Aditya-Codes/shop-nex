import { IoMenu, IoCartOutline, IoCloseOutline } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useBoundStore } from '../app/store';
import { axiosInstance } from '../lib/api/axiosConfig';
import { useNavigate } from 'react-router-dom';

type Customer = {
  _id: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  email: string;
  isAdmin: boolean;
  profileImage: string;
} | null;

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const numberOfCartItems = useBoundStore((state) => state.totalItems);
  const calculations = useBoundStore(
    (state) => state.calculateTotalItemsAndAmount
  );
  const user = useBoundStore((state) => state.user) as Customer;
  const setToken = useBoundStore((state) => state.setToken);
  const setUser = useBoundStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    calculations();
  }, []);

  const logout = async () => {
    await axiosInstance.post('/auth/sign_out');
    setToken(undefined);
    setUser(null);
    navigate('/sign_in');
  };

  const profileNavigate = () => {
    navigate(`account/${user?._id}/profile`);
  };

  return (
    <div
      className={`sticky  left-0 right-0 top-0 z-[100] h-[4rem]  w-full overflow-hidden overflow-x-hidden border-b border-b-zinc-900 bg-[#09090b] lg:bg-opacity-80 lg:backdrop-blur-lg `}
    >
      {/* Navbar */}
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between px-4'>
        {/* Left */}
        <div className='flex items-center space-x-4'>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`text-2xl lg:hidden`}
          >
            <IoMenu />
          </button>
          <Link to='/' className=' hidden items-center space-x-2 lg:flex'>
            <img
              src={logo}
              alt='logo'
              className='h-8 w-8 rounded-full bg-white'
            />
            <h1>Shop Nex</h1>
          </Link>
        </div>

        {/* Middle */}
        <div className={`hidden lg:flex`}>
          <ul className='flex items-center justify-center space-x-8'>
            <Link
              to='/products'
              className='cursor-pointer rounded-md px-3 py-2 transition ease-out hover:bg-zinc-900'
            >
              Products
            </Link>
            <Link
              to='/product_brands'
              className='cursor-pointer rounded-md px-3 py-2 transition ease-out hover:bg-zinc-900'
            >
              Brands
            </Link>
          </ul>
        </div>

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
          } fixed inset-y-0 left-0 z-[200] w-full transform overflow-y-auto bg-zinc-900/10 backdrop-blur-sm backdrop-filter transition duration-[250ms] lg:hidden`}
        >
          <div
            className='
            fixed left-0 top-0 z-30 h-full w-64 bg-[#09090b] 
            '
          >
            <IoCloseOutline
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className='absolute right-4 top-4 cursor-pointer rounded-full border p-1 text-2xl text-white'
            />

            <div className='mt-16'>
              <ul className='flex flex-col items-center justify-center  space-y-8'>
                <Link
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  to='/products'
                  className='w-[90%] cursor-pointer rounded-md px-2  py-2 text-center transition duration-200 ease-out hover:bg-zinc-900'
                >
                  Products
                </Link>
                <Link
                  to='/product_brands'
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className='w-[90%] cursor-pointer rounded-md px-2  py-2 text-center transition duration-200 ease-out hover:bg-zinc-900'
                >
                  Brands
                </Link>
              </ul>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className='flex items-center '>
          <div className='flex items-center space-x-6'>
            <Link
              to='/cart_orders'
              className='relative rounded-md border border-zinc-900 p-2 hover:bg-zinc-900'
            >
              <IoCartOutline />
              <p className='absolute -right-1 -top-1 rounded-full bg-white px-1 text-[0.6rem] text-black'>
                {numberOfCartItems}
              </p>
            </Link>
            {user !== null ? (
              <div className=' flex items-center space-x-6'>
                <img
                  src={user.profileImage}
                  onClick={profileNavigate}
                  alt='profile-image'
                  className='h-7 w-7 cursor-pointer rounded-full'
                />

                {user?.isAdmin ? (
                  <Link
                    to={`/admin/${user._id}/all_products`}
                    className='rounded-md border border-zinc-900 px-3 py-1 hover:bg-zinc-900'
                  >
                    Admin
                  </Link>
                ) : null}

                <LuLogOut onClick={logout} className='h-5 w-5 cursor-pointer' />
              </div>
            ) : (
              <Link to='/sign_in'>
                <button className='rounded-md bg-white p-2 text-xs font-medium tracking-wider text-black'>
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
