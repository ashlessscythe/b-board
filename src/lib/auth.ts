import { JWT } from "next-auth/jwt";
import { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./db";
import { compare } from "bcrypt";
import { Department } from "@prisma/client";

interface User extends NextAuthUser {
  role: "PENDING" | "CONTRIBUTOR" | "VIEWER" | "ADMIN";
  departments: Department[];
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            departments: true,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          departments: user.departments,
        };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }: { token: JWT; session: Session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role as
          | "PENDING"
          | "CONTRIBUTOR"
          | "VIEWER"
          | "ADMIN";
        session.user.departments = token.departments;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: User | null }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.departments = user.departments;
      }
      return token;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // If it's a relative URL, prefix it with baseUrl
      const returnUrl = url.startsWith("/") ? `${baseUrl}${url}` : url;

      // If it's not an internal URL, redirect to homepage
      if (!returnUrl.startsWith(baseUrl)) {
        return baseUrl;
      }

      return returnUrl;
    },
  },
};
