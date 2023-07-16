import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className=' flex min-h-screen flex-col bg-[#09090b] text-white'>
      <Navbar />
      <div className=' mx-auto  flex h-full w-full flex-grow flex-col'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
