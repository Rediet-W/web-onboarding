"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Login from "./components/login";
import Signup from "./components/signup";
import Nav from "./components/nav";
import Dashboard from "./components/dashboard";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <>
      <Nav />
      {status === "authenticated" ? (
        <>
          <Dashboard />
        </>
      ) : (
        <div className="h-screen">
          <Login />
        </div>
      )}
    </>
  );
}
