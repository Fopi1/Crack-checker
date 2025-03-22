import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { comparePassword } from "./lib/utils";
import { prisma } from "./prisma/prisma";

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET не задан в переменных окружения");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize called with:", credentials);
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Укажите email или пароль");
        }
        const email = credentials.email as string;
        const password = credentials.password as string;
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
          },
        });
        console.log("User from Prisma:", user);
        if (!user || !user.password) {
          throw new Error("Пользователь не найден");
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Неверный пароль");
        }
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
      }
      if (trigger === "update") {
        const freshUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { id: true, name: true, email: true },
        });
        if (freshUser) {
          token.name = freshUser.name;
          token.email = freshUser.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: "auth_token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: "csrf_token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: "callback_token",
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});
