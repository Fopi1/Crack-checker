"use server";

import puppeteer from "puppeteer";

import { steamCookies } from "./constants";

export const getAccessToken = async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: ["--no-sandbox", "--disabled-setuid-sandbox"],
  });
  await browser.setCookie(...steamCookies);
  const page = await browser.newPage();
  await page.goto(
    "https://steamcommunity.com/profiles/76561199435735674/edit/info",
  );
  const token = await page.evaluate(() => {
    const raw = document.getElementById("application_config");
    return raw?.dataset.loyalty_webapi_token || null;
  });
  await browser.close();
  return token?.replaceAll('"', "");
};
