"use server";

import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => await bcrypt.compare(password, hashedPassword);
