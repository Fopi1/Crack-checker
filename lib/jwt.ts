import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

if (!REFRESH_SECRET) {
  throw new Error("REFRESH_SECRET is not defined in environment variables");
}

export const generateAccessToken = (userId: number) => {
  const expirationDate = new Date(Date.now() + 15 * 60 * 1000);
  const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "15m" });
  return { token, expirationDate };
};

export const verifyAccessToken = (
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

export const generateRefreshToken = (userId: number) => {
  const expirationDate = new Date(Date.now() + 7 * 3600 * 1000 * 24);
  const token = jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: "7d" });
  return { token, expirationDate };
};
