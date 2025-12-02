import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-between w-full items-center p-3 px-15">
      <h1 className="logo-text">StudyBuddy</h1>

      <div className="flex gap-2 w-70">
        <Link href={" "} className="button-secondary">
          Signup
        </Link>
        <Link href={"/login"} className="button-primary">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Header;
