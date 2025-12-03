import React from "react";

function Bare({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${className} flex items-center justify-center w-full min-h-dvh`}
    >
      {children}
    </div>
  );
}

export default Bare;
