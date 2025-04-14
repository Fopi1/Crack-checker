import { DefaultSession, JWT as DefaultJWT, User as AuthUser } from "next-auth";

import { Role } from "@prisma/client";

declare module "next-auth" {
  interface User extends AuthUser {
    role: Role;
  }
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
  }
}
