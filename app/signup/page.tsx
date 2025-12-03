import React from "react";
import Bare from "../templates/Bare";
import FormSignup from "../components/forms/FormSignup";
import Logo from "../components/logo/Logo";

function Signup() {
  return (
    <Bare className="gap-5 py-10 px-6 md:gap-30 md:px-16 lg:px-24 flex flex-col sm:flex-col-reverse md:flex-row items-center justify-between">
      {/* LEFT — Intro text*/}
      <div className="flex flex-col gap-6 max-w-xl text-left">
        <h1 className="text-3xl font-bold leading-tight bg-linear-to-br from-white to-white/60 bg-clip-text text-transparent">
          Welcome to
          <br />
          <Logo className="big-text" />
        </h1>

        <p className="text-lg text-white/70 leading-relaxed max-w-md">
          Your personal companion for learning smarter, faster, and with
          confidence. Create an account to unlock tailored study assistance,
          document-aware tutoring, and AI-powered explanations adapted just for
          you.
        </p>

        <ul className="text-white/60 text-sm space-y-2 mt-2">
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Personalized explanations
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Upload notes & get
            document-aware help
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Improve your study
            workflow
          </li>
        </ul>
      </div>

      {/* RIGHT — SIGNUP FORM */}
      <div className="w-full max-w-sm mt-10 md:mt-0">
        <FormSignup />
      </div>
    </Bare>
  );
}

export default Signup;
