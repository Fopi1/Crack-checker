import { CookieData } from "puppeteer";

const sessionIdValue = process.env.STEAM_SESSION_ID;
const steamLoginSecureValue = process.env.STEAM_LOGIN_SECURE;

if (!sessionIdValue || !steamLoginSecureValue) {
  throw new Error("Missing steam config");
}
export const steamCookies: CookieData[] = [
  {
    name: "sessionid",
    value: sessionIdValue,
    domain: "steamcommunity.com",
    path: "/",
    httpOnly: false,
    secure: false,
  },
  {
    name: "steamLoginSecure",
    value: steamLoginSecureValue,
    domain: "steamcommunity.com",
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "None",
  },
];
