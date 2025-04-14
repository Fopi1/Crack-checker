"use server";

import { auth } from '../nextAuth';

export const checkIsAdmin = async () => {
  const session = await auth();
  return session?.user.role === "admin";
};
