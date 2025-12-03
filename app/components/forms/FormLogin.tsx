"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function FormLogin() {
  const formRef = useRef<HTMLFormElement>(null);
  const { push: redirect } = useRouter();

  const [pending, setPending] = useState(false);

  const [state, setState] = useState({
    success: false,
    message: "",
    errors: {
      email: "",
      password: "",
      system: "",
    },
    input: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(formRef.current ?? undefined);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    // Basic validation
    if (!email || !password) {
      setState({
        success: false,
        message: "",
        errors: {
          email: !email ? "Email is required." : "",
          password: !password ? "Password is required." : "",
          system: "",
        },
        input: { email: email ?? "", password: password ?? "" },
      });
      setPending(false);
      return;
    }

    console.log(email, password);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        setState({
          success: true,
          message: "Logged in successfully!",
          errors: { email: "", password: "", system: "" },
          input: { email: "", password: "" },
        });

        setTimeout(() => redirect("/"), 600);
      } else {
        setState({
          success: false,
          message: "",
          errors: {
            email: "",
            password: "",
            system: "Invalid email or password.",
          },
          input: { email, password },
        });
      }
    } catch (error) {
      console.log(error);
      setState({
        success: false,
        message: "",
        errors: {
          email: "",
          password: "",
          system: "System error occurred.",
        },
        input: { email: email ?? "", password: password ?? "" },
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="w-110 flex flex-col gap-6 bg-white/10 backdrop-blur-xl p-8 rounded-xl border border-white/20 shadow-xl"
    >
      <h1 className="text-center text-white/90 font-semibold">
        Login to your account and continue learning
      </h1>

      {/* System Error */}
      {state.errors.system && (
        <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-400/20 rounded-lg text-center">
          {state.errors.system}
        </div>
      )}

      {/* Success */}
      {state.success && (
        <div className="p-3 text-sm text-green-300 bg-green-500/10 border border-green-400/20 rounded-lg text-center">
          Logged in successfully! Redirecting...
        </div>
      )}

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
          defaultValue={state.input.email}
          className={`mt-2 input-form ${
            state.errors.email ? "border-red-500/60 focus:ring-red-300" : ""
          }`}
        />
        {state.errors.email && (
          <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>
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
          defaultValue={state.input.password}
          className={`mt-2 input-form ${
            state.errors.password ? "border-red-500/60 focus:ring-red-300" : ""
          }`}
        />
        {state.errors.password && (
          <p className="text-red-500 text-xs mt-1">{state.errors.password}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col gap-4 mt-2">
        <button
          type="submit"
          disabled={pending}
          className="w-full cursor-pointer font-semibold text-white p-3 bg-black/80 rounded-lg border border-white/10 hover:bg-black/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {pending ? "Logging in your account..." : "Login"}
          {pending && <Loader className="animate-spin inline ml-2" />}
        </button>

        <div className="text-white/70 text-sm text-center">
          Don't have an account?
          <Link
            href="/signup"
            className="font-semibold text-white hover:underline ml-1"
          >
            Signup
          </Link>
        </div>
      </div>
    </form>
  );
}
