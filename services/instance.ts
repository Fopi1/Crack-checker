import axios, { AxiosInstance } from "axios";

const createAxiosInstance = (baseURL?: string): AxiosInstance =>
  axios.create({ baseURL });

export const axiosGameStatusInstance = createAxiosInstance(
  process.env.NEXT_PUBLIC_GAMESTATUS_API_URL
);
export const axiosSiteInstance = createAxiosInstance(
  process.env.NEXT_PUBLIC_SITE_API_URL
);
