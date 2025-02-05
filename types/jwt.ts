import { JwtPayload } from "jsonwebtoken";

export type JWTToken = JwtPayload & { id: number; name: string };
