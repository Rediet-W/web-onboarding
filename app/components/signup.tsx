"use client";

import React, { useState } from "react";
import GoogleSignInButton from "./GoogleSignInButton";
import { signIn } from "next-auth/react";
import validator from "validator";
import { useForm } from "react-hook-form";

type SignupFormValues = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const Signup = () => {
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const form = useForm<SignupFormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: SignupFormValues) => {
    if (data.password !== data.confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    setPasswordError(null);

    const result = await signIn("akilsignup", {
      // redirect: false,
      name: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: "user",
    });

    if (result?.error) {
      setApiError(result.error || "Failed to sign up.");
    } else {
      // If sign-up was successful, redirect to the verify page
      window.location.href = `/verify?email=${encodeURIComponent(data.email)}`;
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="w-1/2 flex flex-col justify-center">
        <h1 className="text-center font-poppins font-black text-2xl text-[rgba(37,50,75,1)] m-2">
          Sign Up Today!
        </h1>
        <GoogleSignInButton />
        <p className="special text-center font-normal font-Epilogue text-[rgba(124,132,147,1)]">
          Or Sign Up with Email
        </p>
        <form
          className="flex-col mt-6 space-y-5 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="block font-semibold font-Epilogue text-[rgba(37,50,75,1)]">
            Full Name
          </label>
          <input
            className="p-3 border border-inherit rounded-r-md rounded-l-md w-full h-14"
            type="text"
            id="fullname"
            placeholder="Enter your full name"
            {...register("fullname", { required: "Name is Required" })}
          />
          <p className="errors text-red-500 italic">
            {errors.fullname?.message}
          </p>

          <label className="block font-semibold font-Epilogue text-[rgba(37,50,75,1)]">
            Email Address
          </label>
          <input
            className="p-3 border border-inherit rounded-r-md rounded-l-md w-full h-14"
            id="email"
            type="email"
            placeholder="Enter email address"
            {...register("email", {
              required: "Email is Required",
              validate: (value) =>
                validator.isEmail(value) || "Invalid email format",
            })}
          />
          <p className="errors text-red-500 italic">{errors.email?.message}</p>

          <label className="block font-semibold font-Epilogue text-[rgba(37,50,75,1)]">
            Password
          </label>
          <input
            className="p-3 border border-inherit rounded-r-md rounded-l-md w-full h-14"
            type="password"
            id="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is Required",
              minLength: {
                value: 8,
                message: "Password is too short",
              },
            })}
          />
          <p className="errors text-red-500 italic">
            {errors.password?.message}
          </p>

          <label className="block font-semibold font-Epilogue text-[rgba(37,50,75,1)]">
            Confirm Password
          </label>
          <input
            className="p-3 border border-inherit rounded-r-md rounded-l-md w-full h-14"
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Confirmation is Required",
            })}
          />
          <p className="errors text-red-500 italic">
            {errors.confirmPassword?.message}
          </p>

          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

          <button
            type="submit"
            className="w-full font-bold py-2 px-4 rounded-full bg-[#33357c] text-center text-white mt-12 mb-6"
          >
            Continue
          </button>
        </form>

        <p className="font-normal font-Epilogue text-[rgba(124,132,147,1)] py-2">
          Already have an account?{" "}
          <a href="/login" className="text-[#33357c]">
            Login
          </a>
        </p>
        <p className="font-normal font-Epilogue text-[rgba(124,132,147,1)] py-2">
          By clicking 'continue', you acknowledge that you have read and
          accepted our{" "}
          <a href="" className="text-[#33357c]">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="" className="text-[#33357c]">
            Privacy Policy.{" "}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
