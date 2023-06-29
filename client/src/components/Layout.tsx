import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <Navbar />
      <div className="mx-auto mt-[4rem] pb-12 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
