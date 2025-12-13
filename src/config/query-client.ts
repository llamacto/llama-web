import { QueryClient } from '@tanstack/react-query';

// Create a React Query client.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Baseline defaults.
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      // Baseline defaults.
      retry: 1,
    },
  },
});

export default queryClient;
