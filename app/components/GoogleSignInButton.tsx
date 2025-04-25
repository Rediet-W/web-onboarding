"use client";
import React from "react";
import { signIn } from "next-auth/react";

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="border border-[rgba(204,204,245,1)] w-full flex justify-center p-4 my-4"
    >
      <img src="./google.png" alt="google" className="w-6 h-6" />
      <p className="text-center font-poppins font-black text-xl text-[#33357c] px-2">
        {" "}
        Sign Up with Google
      </p>
    </button>
  );
};

export default GoogleSignInButton;
