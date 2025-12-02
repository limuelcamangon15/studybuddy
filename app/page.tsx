import Image from "next/image";
import Login from "./login/page";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-10 justify-center items-center">
      <h1 className="text-5xl font-medium">Hellowwwww BULSU!!!!!!!!</h1>

      <Link
        className=" font-semibold text-white p-3 border border-white/20 rounded-md backdrop-blur-md hover:bg-white/10 transition-all duration-300"
        href={"/login"}
      >
        Login
      </Link>
    </div>
  );
}
