// ~/next-lab/app/QueryProvider.jsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let browserQueryClient;

function getQueryClient() {
  if (typeof window === 'undefined') {
    return new QueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = new QueryClient();
  }

  return browserQueryClient;
}

export default function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  );
}
