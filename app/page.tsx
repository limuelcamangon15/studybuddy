import Link from "next/link";
import Default from "./templates/Default";
import FormChat from "./components/forms/FormChat";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Default>
        <main className="flex flex-col w-full min-h-full items-center justify-center gap-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Hello, <span className="text-gray-600">Guest!</span>
          </h1>

          <div>
            <p className="text-lg text-gray-600 max-w-xl">
              Welcome to <span className="text-highlight">StudyBuddy</span> —
              your one-stop platform for studying smarter.
            </p>

            <p className="text-gray-600 max-w-2xl">
              Upload your notes and get instant AI-powered study help.{" "}
              <Link
                href="/signup"
                className="text-gray-600 font-semibold hover:underline hover:text-gray-700 transition"
              >
                Create your free account.
              </Link>
            </p>
          </div>

          <FormChat />
        </main>
      </Default>
    </div>
  );
}
