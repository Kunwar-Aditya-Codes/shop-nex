import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className='relative min-h-screen bg-[#09090b] text-white'>
      {/* Navbar */}
      <Navbar />
      <div className='my-[4rem]'>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
