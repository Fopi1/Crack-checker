import axios from "axios";

export const axiosSiteInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_API_URL,
});
