"use client";

import Link from "next/link";
import Logo from "./logo/Logo";
import { signOut, useSession } from "next-auth/react";
import ButtonUploadFile from "./ButtonUploadFile";

function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="flex justify-between items-center w-full p-3 px-10">
      <Logo />

      <div className="w-50 md:w-80 flex gap-2">
        {status === "authenticated" ? (
          <>
            <ButtonUploadFile />

            <button onClick={() => signOut()} className="button-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="button-primary">
              Login
            </Link>
            <Link href="/signup" className="button-secondary">
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
