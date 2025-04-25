"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./components/authprovider";
import { Provider } from "react-redux";
import { store } from "@/store";
import Nav from "./components/nav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <SessionWrapper>
          <body className={inter.className}>{children}</body>
        </SessionWrapper>
      </Provider>
    </html>
  );
}
