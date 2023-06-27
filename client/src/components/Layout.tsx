import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="relative  min-h-screen  bg-[#09090b] text-white">
      {/* Navbar */}
      <Navbar />
      <div className="mx-auto my-[4rem] max-w-7xl">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
