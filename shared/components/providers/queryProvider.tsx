"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FC, PropsWithChildren, useState } from "react";

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
