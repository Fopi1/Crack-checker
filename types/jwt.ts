import { JwtPayload } from "jsonwebtoken";

import { UserData } from "./store";

export type JWTToken = JwtPayload & UserData;
