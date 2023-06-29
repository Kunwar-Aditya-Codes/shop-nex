const Login = () => {
  return (
    <div className="flex h-[40rem] flex-grow items-center justify-center">
      <div className="w-full max-w-xl px-4">
        <form className="flex w-full flex-col space-y-8 rounded-xl border border-zinc-900 p-10 text-lg shadow-xl shadow-zinc-900/20">
          <input
            type="email"
            placeholder="Email"
            autoFocus
            required
            className="rounded-md border border-zinc-900 bg-transparent px-4 py-3 outline-none focus:border-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-md border border-zinc-900 bg-transparent px-4 py-3 outline-none focus:border-white"
          />

          <button className="rounded-md bg-white/75 py-3 font-light uppercase tracking-wider text-black outline-none disabled:bg-zinc-900 disabled:text-white">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
