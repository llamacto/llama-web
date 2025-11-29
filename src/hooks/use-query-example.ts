'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import request from '@/http';
import { queryClient } from '@/config';
import { eventBus } from '@/utils';

// 示例类型定义
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
}

// =============== 查询示例 ===============

/**
 * 获取用户列表的 Hook
 */
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => request.get<User[]>('/users'),
  });
}

/**
 * 获取单个用户的 Hook
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => request.get<User>(`/users/${id}`),
    // 当 id 不存在时不执行查询
    enabled: !!id,
  });
}

/**
 * 获取用户帖子的 Hook
 */
export function useUserPosts(userId: string) {
  return useQuery({
    queryKey: ['posts', { userId }],
    queryFn: () => request.get<Post[]>(`/posts?userId=${userId}`),
    // 当 userId 不存在时不执行查询
    enabled: !!userId,
  });
}

// =============== 变更示例 ===============

/**
 * 创建用户的 Hook
 */
export function useCreateUser() {
  return useMutation({
    mutationFn: (newUser: Omit<User, 'id'>) => 
      request.post<User>('/users', newUser),
    onSuccess: (data) => {
      // 成功后使相关查询失效，触发重新获取
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // 发布事件通知
      eventBus.publish('user:created', data);
    },
  });
}

/**
 * 更新用户的 Hook
 */
export function useUpdateUser() {
  return useMutation({
    mutationFn: ({ id, ...data }: User) => 
      request.put<User>(`/users/${id}`, data),
    onSuccess: (updatedUser) => {
      // 使特定用户查询和用户列表查询同时失效
      queryClient.invalidateQueries({ 
        queryKey: ['users', updatedUser.id] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['users'],
        exact: true 
      });
      // 发布事件通知
      eventBus.publish('user:updated', updatedUser);
    },
  });
}

/**
 * 删除用户的 Hook
 */
export function useDeleteUser() {
  return useMutation({
    mutationFn: (id: string) => 
      request.delete<void>(`/users/${id}`),
    onSuccess: (_, variables) => {
      // 使用户相关查询失效
      queryClient.invalidateQueries({ 
        queryKey: ['users'] 
      });
      // 删除特定用户的缓存
      queryClient.removeQueries({ 
        queryKey: ['users', variables] 
      });
      // 发布事件通知
      eventBus.publish('user:deleted', variables);
    },
  });
}
