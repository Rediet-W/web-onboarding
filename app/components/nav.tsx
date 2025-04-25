"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log(session?.user?.data?.name);
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };
  const [isBookmarkPage, setIsBookmarkPage] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setIsBookmarkPage(currentPath.includes("/bookmark"));
  }, []);

  return (
    <div>
      <nav
        className="flex justify-between items-center h-16 bg-violet-200 text-violet-700 relative shadow-sm font-mono space-x-2 p-3"
        role="navigation"
      >
        {status === "authenticated" ? (
          <>
            <div className="flex justify-between items-center w-full">
              <h2 className="flex-shrink-0 font-Epilogue font-semibold text-xl text-violet">
                {session?.user?.data?.name
                  ? "Hello " + session?.user?.data?.name
                  : "Welcome"}
              </h2>
              <div className=" flex items-center space-x-4">
                {isBookmarkPage ? (
                  <a href="/">Dashboard</a>
                ) : (
                  <a href="/bookmark">Bookmarked</a>
                )}
                <button
                  onClick={handleSignOut}
                  className=" text-center text-violet-700 font-Epilogue font-semibold py-1 px-3 w-fit rounded-full m-2 bg-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-end w-full">
            <a
              className="  text-center text-violet-700 font-Epilogue font-semibold py-1 px-3 w-fit rounded-full m-2 bg-white"
              href="/login"
            >
              Login
            </a>
            <a
              className=" text-center text-violet-700 font-Epilogue font-semibold py-1 px-3 w-fit rounded-full m-2 bg-white"
              href="/signup"
            >
              Signup
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
