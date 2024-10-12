import axios from "axios";

export const axiosGamestatusInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GAMESTATUS_API_URL,
});
