"use server";

import { prisma } from "@/prisma/prismaClient";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const checkIfNameExist = async (name: string) => {
  console.log("checking name");
  return !!(await prisma.user.findUnique({
    where: { name },
  }));
};

export const checkIfEmailExist = async (email: string) => {
  console.log("checking email");
  return !!(await prisma.user.findUnique({
    where: { email },
  }));
};

export const checkUserExistence = async (name: string, email: string) => {
  const isEmailExist = await checkIfEmailExist(email);
  const isNameExist = await checkIfNameExist(name);
  return { name: isNameExist, email: isEmailExist };
};
