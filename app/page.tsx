import Image from "next/image";
import Login from "./login/page";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Header />

      {/**<div className="">
        <h1 className="text-5xl font-medium">Hello, Guest!</h1>

        <Link
          className="font-semibold text-white p-3 border border-white/20 rounded-md backdrop-blur-md hover:bg-white/10 transition-all duration-300"
          href={"/login"}
        >
          Login
        </Link>
      </div> */}

      <Footer />
    </div>
  );
}
