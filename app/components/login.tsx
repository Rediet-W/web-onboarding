"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Nav from "./nav";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await signIn("akillogin", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/");
    }
  };
  return (
    <div className="flex  ">
      <div className="w-1/2"></div>
      <div className="w-80 flex flex-col items-center mt-28 mr-64">
        <h1 className="font-poppins font-black text-2xl text-[rgba(37,50,75,1)]">
          Welcome Back,
        </h1>

        <form
          className="flex-col mt-12 space-y-5 w-full"
          onSubmit={handleLogin}
        >
          <label className="block font-semibold font-Epilogue text-[rgba(37,50,75,1)]">
            Email Address
          </label>
          <input
            className="p-4 border border-inherit rounded-r-md rounded-l-md w-full h-14"
            id="email"
            type="email"
            placeholder="Enter email address"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block font-semibold font-Epilogue text-[rgba(37,50,75,1)]">
            Password
          </label>
          <input
            className="p-4 border border-inherit rounded-r-md rounded-l-md w-full h-14"
            type="password"
            placeholder="Enter password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full font-bold py-2 px-4 rounded-full bg-[#33357c] text-center text-white mt-12 mb-6"
          >
            Login
          </button>
        </form>
        <p className="font-normal font-Epilogue text-[rgba(124,132,147,1)] py-3 ">
          Don't have an account?
          <a href="/signup" className="text-[#33357c] ml-2">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
