import { QueryClient } from '@tanstack/react-query';

// 创建 React Query 客户端
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 基本配置
      refetchOnWindowFocus: false, // 窗口重新获得焦点时不自动重新获取
      retry: 1, // 失败时重试一次
      staleTime: 5 * 60 * 1000, // 数据在5分钟内被视为新鲜
    },
    mutations: {
      // 修改操作的基本配置
      retry: 1,
    },
  },
});

export default queryClient;
