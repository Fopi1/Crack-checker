"use server";

import { prisma } from "@/prisma/prismaClient";
import { PublicUser } from "@/types/api";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const checkIfUserExist = async (publicData: PublicUser) => {
  const { name, email } = publicData;
  const userByName = await prisma.user.findUnique({
    where: { name },
  });
  const userByEmail = await prisma.user.findUnique({
    where: { email },
  });
  return { userByName: !!userByName, userByEmail: !!userByEmail };
};
