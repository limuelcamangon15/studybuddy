import Link from "next/link";

function Login() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen w-full">
      <form
        action=""
        className="w-[20%] flex flex-col gap-5 justify-center items-center bg-white/10 rounded-md p-5"
      >
        <h1 className="font-semibold">Login</h1>
        <input
          type="email"
          name="email"
          id=""
          placeholder="Enter your email"
          className="py-2 px-3 outline-0 border border-white/10 rounded-md w-full"
        />

        <input
          type="password"
          name="email"
          id=""
          placeholder="Enter your password"
          className="py-2 px-3 outline-0 border border-white/10 rounded-md w-full"
        />

        <button className="w-full cursor-pointer font-semibold text-white p-2 bg-black rounded-md backdrop-blur-md hover:bg-black/60 transition-all duration-300">
          Login
        </button>
      </form>

      <Link
        className=" font-semibold text-white p-3 border border-white/20 rounded-md backdrop-blur-md hover:bg-white/10 transition-all duration-300"
        href={"/"}
      >
        Home
      </Link>
    </div>
  );
}

export default Login;
