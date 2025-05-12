"use client";
import { DehydratedState, QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRef } from "react";

const TanstackQueryClientProvider = ({
  children,
  dehydratedState
}: {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}) => {

  const queryClient = useRef(new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Don't refetch when user switches tabs
        refetchOnReconnect: true, // Refetch when internet reconnects
        retry: 2, // Retry failed queries twice before throwing an error
        staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient.current}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default TanstackQueryClientProvider;