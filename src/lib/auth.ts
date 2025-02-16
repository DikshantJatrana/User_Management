import NextAuth from "next-auth";
import { DefaultSession, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "./connectDB";
import { loginSchema } from "./zod";
import User from "@/model/User";

export const { auth, handlers, signIn } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      authorize: async (credentials: any): Promise<any> => {
        try {
          await dbConnect();

          const { email, password } = await loginSchema.parseAsync(credentials);

          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("User not found.");
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid credentials.");
          }

          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.email = user.email?.toString();
        token.username = user.username;
        token.isVerified = user.isVerified;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token._id) {
        session.user = {
          ...session.user,
          _id: token._id,
          email: token.email,
          username: token.username,
          isVerified: token.isVerified,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
