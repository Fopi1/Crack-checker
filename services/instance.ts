import axios, { AxiosInstance } from "axios";

const createAxiosInstance = (baseURL?: string, timeout = 0): AxiosInstance =>
  axios.create({ baseURL, timeout: timeout });

export const axiosGameStatusInstance = createAxiosInstance(
  process.env.NEXT_PUBLIC_GAMESTATUS_API_URL,
  15000
);
export const axiosSiteInstance = createAxiosInstance(
  process.env.NEXT_PUBLIC_SITE_API_URL
);
