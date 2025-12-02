import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between items-center w-full p-3 px-10">
      <Link href="/" className="logo-text">
        StudyBuddy
      </Link>

      <div className="w-50 md:w-80 flex gap-2">
        <Link href="/login" className="button-primary">
          Login
        </Link>
        <Link href="/signup" className="button-secondary">
          Signup
        </Link>
      </div>
    </header>
  );
}

export default Header;
