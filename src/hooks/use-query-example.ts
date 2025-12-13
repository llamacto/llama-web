'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import request from '@/http';
import { queryClient } from '@/config';
import { eventBus } from '@/utils';

// Example types
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

// =============== Query examples ===============

/**
 * Fetch users.
 */
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => request.get<User[]>('/users'),
  });
}

/**
 * Fetch a single user.
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => request.get<User>(`/users/${id}`),
    // Do not run the query if id is empty.
    enabled: !!id,
  });
}

/**
 * Fetch posts for a user.
 */
export function useUserPosts(userId: string) {
  return useQuery({
    queryKey: ['posts', { userId }],
    queryFn: () => request.get<Post[]>(`/posts?userId=${userId}`),
    // Do not run the query if userId is empty.
    enabled: !!userId,
  });
}

// =============== Mutation examples ===============

/**
 * Create a user.
 */
export function useCreateUser() {
  return useMutation({
    mutationFn: (newUser: Omit<User, 'id'>) => 
      request.post<User>('/users', newUser),
    onSuccess: (data) => {
      // Invalidate queries to refetch.
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // Publish an event for decoupled listeners.
      eventBus.publish('user:created', data);
    },
  });
}

/**
 * Update a user.
 */
export function useUpdateUser() {
  return useMutation({
    mutationFn: ({ id, ...data }: User) => 
      request.put<User>(`/users/${id}`, data),
    onSuccess: (updatedUser) => {
      // Invalidate both the list and the item query.
      queryClient.invalidateQueries({ 
        queryKey: ['users', updatedUser.id] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['users'],
        exact: true 
      });
      // Publish an event for decoupled listeners.
      eventBus.publish('user:updated', updatedUser);
    },
  });
}

/**
 * Delete a user.
 */
export function useDeleteUser() {
  return useMutation({
    mutationFn: (id: string) => 
      request.delete<void>(`/users/${id}`),
    onSuccess: (_, variables) => {
      // Invalidate list queries.
      queryClient.invalidateQueries({ 
        queryKey: ['users'] 
      });
      // Remove the specific user cache entry.
      queryClient.removeQueries({ 
        queryKey: ['users', variables] 
      });
      // Publish an event for decoupled listeners.
      eventBus.publish('user:deleted', variables);
    },
  });
}
