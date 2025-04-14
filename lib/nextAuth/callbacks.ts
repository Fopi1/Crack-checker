import { NextAuthConfig } from "next-auth";

import { prisma } from "@/prisma/prisma";
import { Role } from "@prisma/client";

export const authCallbacks: Partial<NextAuthConfig["callbacks"]> = {
  async signIn({ user, account, profile }) {
    if (account?.provider === "google" || account?.provider === "discord") {
      const email = profile?.email || user.email;
      if (!email) {
        return false;
      }
      const existingUser = await prisma.user.findUnique({
        where: { email },
        include: { accounts: true },
      });
      if (existingUser) {
        const isAccountLinked = existingUser?.accounts.find(
          (acc) =>
            acc.provider === account.provider &&
            acc.providerAccountId === account.providerAccountId
        );
        if (!isAccountLinked) {
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: "oauth",
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              expires_at: account.expires_at,
              refresh_token: account.refresh_token,
              id_token: account.id_token,
              scope: account.scope,
              token_type: account.token_type,
            },
          });
        }
      }
    }
    return true;
  },
  async jwt({ token, user, trigger }) {
    if (user) {
      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      token.role = user.role;
    }
    if (trigger === "update") {
      const freshUser = await prisma.user.findUnique({
        where: { id: token.id as string },
        select: { name: true, email: true, role: true },
      });
      if (freshUser) {
        token.name = freshUser.name;
        token.email = freshUser.email;
        token.role = freshUser.role;
      }
    }
    return token;
  },
  async session({ session, token }) {
    if (token.id) {
      session.user.id = token.id as string;
      session.user.name = token.name ?? "";
      session.user.email = token.email ?? "";
      session.user.role = token.role as Role;
    }
    return session;
  },
};
