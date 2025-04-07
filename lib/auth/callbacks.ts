import { NextAuthConfig } from 'next-auth';

import { prisma } from '@/prisma/prisma';

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
      session.user.name = token.name ?? "";
      session.user.email = token.email ?? "";
    }
    return session;
  },
};
