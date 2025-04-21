import { NextRequest } from "next/server";

export type AnyRequest = NextRequest | Request;

export interface SteamQueryProps {
  is_modified_since: number;
  have_description_language: string;
  include_games: boolean;
  include_dlc: boolean;
  include_software: boolean;
  include_videos: boolean;
  include_hardware: boolean;
  last_appid: number;
  max_results: number;
}

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
