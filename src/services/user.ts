// User service layer
// Example of functional API pattern for CRUD operations

import { request } from '@/http';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface UserListResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

// API endpoints
const ENDPOINTS = {
  LIST: '/backend/api/users',
  DETAIL: (id: string) => `/backend/api/users/${id}`,
} as const;

/**
 * User API
 * Example service demonstrating the functional API pattern
 */
export const userApi = {
  list: (params?: UserListParams) =>
    request.get<UserListResponse>(ENDPOINTS.LIST, { params }),

  get: (id: string) =>
    request.get<User>(ENDPOINTS.DETAIL(id)),

  create: (data: CreateUserDto) =>
    request.post<User>(ENDPOINTS.LIST, data),

  update: (id: string, data: UpdateUserDto) =>
    request.patch<User>(ENDPOINTS.DETAIL(id), data),

  delete: (id: string) =>
    request.delete<void>(ENDPOINTS.DETAIL(id)),
} as const;

export type UserApi = typeof userApi;
