import Link from "next/link";

function Login() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen w-full">
      <form
        action=""
        className="w-110 flex flex-col gap-5 justify-center items-center bg-white/10 rounded-md p-5"
      >
        <h1 className="font-semibold">Login to StudyBuddy</h1>
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

        <div className="w-full flex flex-col gap-3 justify-center items-center">
          <button className="w-full cursor-pointer font-semibold text-white p-2 bg-black rounded-md backdrop-blur-md hover:bg-black/60 transition-all duration-300">
            Login
          </button>
          <div className="text-white/70">
            <span>
              Don't have an account?
              <Link
                className="font-semibold text-white transition-all duration-300"
                href={"/"}
              >
                {" "}
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
