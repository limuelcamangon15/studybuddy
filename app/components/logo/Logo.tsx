import Link from "next/link";
import React from "react";

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`logo-text ${className}`}>
      StudyBuddy
    </Link>
  );
}

export default Logo;
