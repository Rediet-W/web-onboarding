import NextAuth, { NextAuthOptions, User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),

    // Akil Login Provider
    CredentialsProvider({
      id: "akillogin",
      name: "Akil Login",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch("https://akil-backend.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const user = await res.json();

          if (!res.ok) {
            // Handle the error and provide a message
            throw new Error(
              user?.message || "Failed to login. Please check your credentials."
            );
          }

          if (user) {
            // Optionally, customize the user object here
            return { ...user, role: user.role || "user" }; // Add default role if not provided
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Login failed. Please try again.");
        }
      },
    }),

    // Akil Signup Provider
    CredentialsProvider({
      id: "akilsignup",
      name: "Akil Signup",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        confirmPassword: { label: "Confirm Password", type: "password" },
        role: { label: "Role", type: "text", placeholder: "user" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch("https://akil-backend.onrender.com/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: credentials?.name,
              email: credentials?.email,
              password: credentials?.password,
              confirmPassword: credentials?.confirmPassword,
              role: credentials?.role || "user",
            }),
          });

          const result = await res.json();

          if (!res.ok) {
            // Handle the error and provide a message
            throw new Error(
              result.message || "Failed to sign up. Please check your details."
            );
          }

          if (result.data) {
            return { ...result.data, role: result.data.role || "user" };
          } else {
            return null;
          }
        } catch (error) {
          console.log("Signup error:", error);
          throw new Error(
            (error as Error).message || "Signup failed. Please try again."
          );
        }
      },
    }),

    // Akil Verify Provider
    CredentialsProvider({
      id: "akilverify",
      name: "Akil Verify",
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            "https://akil-backend.onrender.com/verify-email",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                OTP: credentials?.otp,
              }),
            }
          );

          const user = await res.json();

          if (!res.ok) {
            // Handle the error and provide a message
            throw new Error(
              user?.message || "Failed to verify email. Please check the OTP."
            );
          }

          if (user) {
            return { ...user, status: "authenticated" }; // Optionally, customize the user object here
          } else {
            return null;
          }
        } catch (error) {
          console.error("Verification error:", error);
          throw new Error("Verification failed. Please try again.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    verifyRequest: "/verify",
    error: "/auth/error", // Redirect to a custom error page
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: User }) {
      if (user) {
        token.user = user;
        token.accessToken = (user as any).data?.accessToken; // Store the JWT from the backend
        // console.log("user Token", token);
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.user) {
        session.user = token.user;
        session.user.accessToken = (token.user as any).data?.accessToken; // Pass the access token to the session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
