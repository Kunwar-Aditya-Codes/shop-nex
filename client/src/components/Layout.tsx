import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Navbar */}
      <Navbar />
      <div className="mx-auto mt-[4rem] pb-12 ">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
