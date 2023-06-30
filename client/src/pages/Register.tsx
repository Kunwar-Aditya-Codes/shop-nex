import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";

type Props = {};
const Register = (props: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="flex w-full max-w-xl flex-col items-center justify-center px-4">
        <form className="flex w-full flex-col space-y-8 rounded-xl  px-4 text-lg md:p-10 ">
          <div className="flex w-full flex-col space-y-4 lg:flex-row lg:justify-between lg:space-x-2 lg:space-y-0">
            <input
              type="text"
              placeholder="First Name"
              autoFocus
              required
              className="w-full rounded-md border border-zinc-900 bg-transparent px-4 py-3 text-sm tracking-wide outline-none focus:border-white"
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              className="w-full rounded-md border border-zinc-900 bg-transparent px-4 py-3 text-sm tracking-wide outline-none focus:border-white"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            required
            className="rounded-md border border-zinc-900 bg-transparent px-4 py-3 text-sm tracking-wide outline-none focus:border-white"
          />

          <div className="relative flex items-center">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-md border border-zinc-900 bg-transparent px-4 py-3 text-sm tracking-wide outline-none focus:border-white"
            />
            <div className="absolute right-4">
              {show ? (
                <AiOutlineEyeInvisible
                  onClick={() => setShow(!show)}
                  className="h-6 w-6"
                />
              ) : (
                <AiOutlineEye
                  onClick={() => setShow(!show)}
                  className="h-6 w-6"
                />
              )}
            </div>
          </div>
          <button className="rounded-md bg-white/75 py-2 font-light uppercase tracking-wider text-black outline-none disabled:bg-zinc-900 disabled:text-white ">
            Sign Up
          </button>
        </form>

        <p className="mt-4 px-4 text-sm  tracking-wider text-zinc-400">
          Have account ?
          <span className="ml-1 text-white underline underline-offset-4">
            <Link to="/sign_in">Sign In</Link>
          </span>
        </p>
      </div>
    </div>
  );
};
export default Register;
