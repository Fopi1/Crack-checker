export const getApiParams = (searchParams: URLSearchParams) => {
  const result: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    result[key] = value;
  }

  return result;
};
