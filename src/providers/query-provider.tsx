'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/config';
import { PropsWithChildren, useState } from 'react';

/**
 * React Query Provider 组件
 * 为整个应用提供 React Query 功能
 */
export function QueryProvider({ children }: PropsWithChildren) {
  // 确保在客户端渲染时每个请求都有自己的 QueryClient 实例
  const [client] = useState(() => queryClient);

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}
