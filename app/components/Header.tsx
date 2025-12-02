import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between w-full items-center p-3 px-15">
      <h1 className="logo-text">StudyBuddy</h1>

      <section className="flex gap-2 w-70">
        <Link href={"/login"} className="button-primary">
          Login
        </Link>
        <Link href={"/signup"} className="button-secondary">
          Signup
        </Link>
      </section>
    </header>
  );
}

export default Header;
