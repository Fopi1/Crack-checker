import { CookieData } from "puppeteer";

const sessionIdValue = process.env.STEAM_SESSION_ID;
const steamLoginSecureValue = process.env.STEAM_LOGIN_SECURE;
const browserId = process.env.STEAM_BROWSER_ID;
const cookieSettings = process.env.STEAM_COOKIE_SETTINGS;

export const steamCookies: CookieData[] = [
  {
    name: "browserid",
    value: browserId!,
    domain: "steamcommunity.com",
    path: "/",
    httpOnly: false,
    secure: true,
    sameSite: "None",
  },
  {
    name: "cookieSettings",
    value: cookieSettings!,
    domain: "steamcommunity.com",
    path: "/",
    httpOnly: false,
    secure: true,
    sameSite: "None",
  },
  {
    name: "sessionid",
    value: sessionIdValue!,
    domain: "steamcommunity.com",
    path: "/",
    httpOnly: false,
    secure: false,
  },
  {
    name: "steamLoginSecure",
    value: steamLoginSecureValue!,
    domain: "steamcommunity.com",
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: Math.floor(new Date("2026-06-03T19:54:23.494Z").getTime() / 1000),
  },
];
