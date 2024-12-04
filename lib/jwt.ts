import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (
  token: string
): (JwtPayload & { id: number }) | null => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      id: number;
    };
    return payload;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
