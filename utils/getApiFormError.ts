import axios from "axios";

export const getApiFormError = (error: unknown) => {
  const errorResponse = axios.isAxiosError(error) ? error.response?.data : null;
  return {
    errorField: errorResponse.field || "root",
    errorMessage: errorResponse.error || "Unexpected error. Try again later.",
  };
};
