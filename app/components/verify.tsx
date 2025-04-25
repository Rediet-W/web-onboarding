"use client";

import React, { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Verify = () => {
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [isClickable, setIsClickable] = useState(false);
  const [timer, setTimer] = useState(30);
  const router = useRouter();

  const searchParams = new URLSearchParams(window.location.search);
  const email =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("email")
      : null;

  const handleVerification = async () => {
    if (!email) {
      setVerificationError("No email provided for verification.");
      return;
    }

    try {
      const result = await signIn("akilverify", {
        redirect: false,
        email,
        otp: otp.join(""),
      });

      if (result?.error) {
        setVerificationError(result.error || "Failed to verify.");
      } else {
        router.push("/opportunities/search");
      }
    } catch (error) {
      setVerificationError("An unexpected error occurred.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setIsClickable(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResendCode = async () => {
    setTimer(30);
    setIsClickable(false);

    try {
      const response = await fetch(
        "https://akil-backend.onrender.com/resend-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to resend OTP.");
      }
    } catch (error) {
      setVerificationError("Failed to resend OTP. Please try again.");
    }
  };

  const formattedTimer = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex justify-center items-center pt-24">
      <div className="w-1/2 flex flex-col justify-center align-middle">
        <h1 className="text-center font-poppins font-black text-2xl text-[rgba(37,50,75,1)] m-2">
          Verify Email
        </h1>
        <p className=" text-center font-normal font-Epilogue text-[rgba(124,132,147,1)]">
          We've sent a verification code to the email address you provided. To
          complete the verification process, please enter the code here.
        </p>

        <OTPField otp={otp} setOtp={setOtp} />

        {verificationError && (
          <p className="text-red-500 text-sm">{verificationError}</p>
        )}

        <button
          type="button"
          onClick={handleVerification}
          className="w-full font-bold py-2 px-4 rounded-full bg-[#33357c] text-center text-white mt-12 mb-6"
        >
          Verify
        </button>

        <p className=" text-center font-normal font-Epilogue text-[rgba(124,132,147,1)]">
          You can request to
          <button
            onClick={handleResendCode}
            disabled={!isClickable}
            className={`mx-2 text-[#33357c] ${
              isClickable ? "" : "pointer-events-none opacity-50"
            }  `}
          >
            Resend Code
          </button>
          in {formattedTimer}
        </p>
      </div>
    </div>
  );
};

export default Verify;

let currentOTPIndex: number = 0;
const OTPField = ({
  otp,
  setOtp,
}: {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);

    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);

    setOtp(newOTP);
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (e.key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  return (
    <div className={"mt-36 mb-4 flex justify-center items-center space-x-2"}>
      {otp.map((_, index) => {
        return (
          <React.Fragment key={index}>
            <input
              ref={activeOTPIndex === index ? inputRef : null}
              type="number"
              className={
                "w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl  border-gray-400 focus:border-violet-700 focus:text-gray-700 text-gray-400 transition"
              }
              onChange={handleOnChange}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              value={otp[index]}
            />
            {index === otp.length - 1 ? null : (
              <span className={"w-2 py-0.5 "} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
