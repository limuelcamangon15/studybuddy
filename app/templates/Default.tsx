import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex w-full p-5 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
