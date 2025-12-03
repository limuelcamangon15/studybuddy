"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { createUser } from "@/app/lib/actions/user";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

// Same initialState you used earlier
const initialState = {
  success: false,
  message: null,
  payload: null,
  errors: [],
  input: {
    name: "",
    email: "",
    password: "",
  },
};

export default function FormSignup() {
  const [state, formAction, isPending] = useActionState(
    createUser,
    initialState
  );

  const { push: redirect } = useRouter();

  useEffect(() => {
    if (state.success) {
      redirect("/login");
    }
  }, [state]);

  const getError = (field: string) =>
    state.errors?.find((err) => err.field === field)?.message;

  return (
    <form
      action={formAction}
      className="w-110 flex flex-col gap-6 bg-white/10 backdrop-blur-xl p-8 rounded-xl border border-white/20 shadow-xl"
    >
      <h1 className="text-center text-white/90 font-semibold">
        Signup and start learning smarter
      </h1>

      {/* Global Form Message */}
      {!state.success && state.message && (
        <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-400/20 rounded-lg text-center">
          {state.message}
        </div>
      )}
      {state.success && (
        <div className="p-3 text-sm text-green-300 bg-green-500/10 border border-green-400/20 rounded-lg text-center">
          Account created successfully! Redirecting...
        </div>
      )}

      {/* Name */}
      <div className="w-full">
        <label htmlFor="name" className="text-sm text-white/80 font-medium">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          defaultValue={state.success ? "" : state.input.name}
          className={`mt-2 input-form ${
            getError("name") ? "border-red-500/60 focus:ring-red-300" : ""
          }`}
        />
        {getError("name") && (
          <p className="text-red-500 text-xs mt-1">{getError("name")}</p>
        )}
      </div>

      {/* Email */}
      <div className="w-full">
        <label htmlFor="email" className="text-sm text-white/80 font-medium">
          Email
        </label>
        <input
          type="text"
          inputMode="email"
          autoComplete="email"
          name="email"
          id="email"
          placeholder="you@example.com"
          defaultValue={state.success ? "" : state.input.email}
          className={`mt-2 input-form ${
            getError("email") ? "border-red-500/60 focus:ring-red-300" : ""
          }`}
        />
        {getError("email") && (
          <p className="text-red-500 text-xs mt-1">{getError("email")}</p>
        )}
      </div>

      {/* Password */}
      <div className="w-full">
        <label htmlFor="password" className="text-sm text-white/80 font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          defaultValue={state.success ? "" : state.input.password}
          className={`mt-2 input-form ${
            getError("password") ? "border-red-500/60 focus:ring-red-300" : ""
          }`}
        />
        {getError("password") && (
          <p className="text-red-500 text-xs mt-1">{getError("password")}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col gap-4 mt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer font-semibold text-white p-3 bg-black/80 rounded-lg border border-white/10 hover:bg-black/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating your account..." : "Signup"}
          {isPending ? <Loader className="animate-spin inline ml-2" /> : ""}
        </button>

        <div className="text-white/70 text-sm text-center">
          Already have an account?
          <Link
            href="/login"
            className="font-semibold text-white hover:underline ml-1"
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}
