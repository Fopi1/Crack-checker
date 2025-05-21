import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";

import { loginFormSchema } from "@/app/(me)/login/constants";
import { RateLimiterPrefixes } from "@/constants";
import { prisma } from "@/prisma/prisma";

import { rateLimit } from "../auth/";
import { comparePassword } from "../utils";

export const authProviders: NextAuthConfig["providers"] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      const limitError = await rateLimit(
        req,
        RateLimiterPrefixes.LOGIN,
        5,
        120,
      );
      if (limitError) {
        throw new Error("Too many requests");
      }
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Provide email or password");
      }
      const parseResult = loginFormSchema.safeParse(credentials);
      if (!parseResult.success) {
        throw new Error("Invalid data");
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
          role: true,
        },
      });
      if (!user || !user.password) {
        throw new Error("Invalid email or password");
      }
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    },
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  }),
];
