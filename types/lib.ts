import { NextRequest } from "next/server";

export type AnyRequest = NextRequest | Request;


export interface SteamResponse {
  response: {
    apps: SteamGame[];
    have_more_result: boolean;
    last_appid: number;
  };
}

export interface SteamGame {
  appid: number;
  name: string;
  last_modified: number;
  price_change_number: number;
}
