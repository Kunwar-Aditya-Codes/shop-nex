import {
  IoMenu,
  IoCartOutline,
  IoSearchOutline,
  IoCloseOutline,
} from 'react-icons/io5';
import { useState } from 'react';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='fixed left-0 right-0 top-0 h-[4rem] w-full border-b border-b-zinc-900 bg-[#09090b] '>
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between px-4'>
        {/* Left */}
        <div className='flex items-center space-x-4'>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`text-2xl lg:hidden`}
          >
            <IoMenu />
          </button>
          <div className=' hidden items-center space-x-4 lg:flex'>
            <h1>Shop Nex</h1>
          </div>
        </div>
        {/* Middle */}
        <div className={`hidden lg:flex`}>
          <ul className='flex items-center justify-center space-x-6'>
            <li>Products</li>
            <li>Clothing</li>
            <li>Brands</li>
          </ul>
        </div>

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
          } fixed inset-y-0 left-0 z-30 w-full transform overflow-y-auto bg-zinc-900/10 backdrop-blur-sm backdrop-filter transition duration-[250ms] lg:hidden`}
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
          </div>
        </div>

        {/* Right */}
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-4'>
            <button className=' rounded-md border border-zinc-900 p-2'>
              <IoSearchOutline />
            </button>
            <button className=' rounded-md border border-zinc-900 p-2'>
              <IoCartOutline />
            </button>
            <button className='rounded-md bg-white p-2 text-xs font-medium tracking-wider text-black'>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
