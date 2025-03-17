import type { JwtPayload } from "jsonwebtoken";

import type { UserData } from "./store";

export type JWTToken = JwtPayload & UserData;
