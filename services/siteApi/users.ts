"use server";

import { prisma } from "@/prisma/prismaClient";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const checkIfEmailExist = async (email: string) => {
  return !!(await prisma.user.findUnique({
    where: {
      email: email,
    },
  }));
};
