import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";
const Footer = () => {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-y-8 bg-zinc-900 px-4 py-8 text-sm md:grid-cols-3">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="w-full  text-center text-lg font-semibold text-white lg:text-start">
          Get to know us
        </h1>
        <div className="flex w-full items-center justify-center space-x-4  text-zinc-300 underline underline-offset-4 lg:flex-col lg:items-start lg:space-x-0 lg:space-y-2">
          <p>About Us </p>
          <p>Careers</p>
          <p>Press Releases</p>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <h1 className="w-full  text-center text-lg font-semibold text-white lg:text-start">
          Contact Us
        </h1>
        <div className="flex items-center justify-center space-x-4 text-zinc-300">
          <AiFillFacebook className="h-6 w-6 cursor-pointer transition ease-out hover:text-blue-500" />
          <AiFillInstagram className="h-6 w-6 cursor-pointer transition ease-out hover:text-pink-500" />
          <AiFillTwitterSquare className="h-6 w-6 cursor-pointer transition ease-out hover:text-sky-500" />
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <h1 className="w-full  text-center text-lg font-semibold text-white lg:text-start">
          Make money
        </h1>
        <div className="flex w-full items-center justify-center space-x-4  text-zinc-300 underline underline-offset-4 lg:flex-col lg:items-start lg:space-x-0 lg:space-y-2">
          <p>Create Store </p>
          <p>Sell Products</p>
          <p>Policy</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
