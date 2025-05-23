import NextAuth from "next-auth";

import { AppRoutes } from "@/constants";
import { prisma } from "@/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { authCallbacks } from "./callbacks";
import { authCookies } from "./cookies";
import { authProviders } from "./providers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: AppRoutes.LOGIN },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: authProviders,
  callbacks: authCallbacks,
  cookies: authCookies,
});
