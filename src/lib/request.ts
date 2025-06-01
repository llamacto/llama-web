import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Environment configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT || 10000);

// Request configuration type
export interface RequestConfig extends AxiosRequestConfig {
  // Custom configuration options
  skipAuth?: boolean; // Skip authentication
  skipErrorHandler?: boolean; // Skip error handling
  baseURL?: string; // Optional custom baseURL
}

// Response data type
export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

// Error type
export class ApiError extends Error {
  code: number;
  data?: unknown;
  
  constructor(message: string, code: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.data = data;
  }
}

// Interceptor setup function
function setupInterceptors(instance: AxiosInstance) {
  // Request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig & RequestConfig) => {
      // Add authentication information
      if (!config.skipAuth) {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Return data portion directly
      const { data } = response;
      // Specific business logic handling
      if (data && data.code !== undefined) {
        if (data.code !== 0 && data.code !== 200) {
          throw new ApiError(data.message || 'Request failed', data.code, data.data);
        }
        return data.data;
      }
      return data;
    },
    (error: AxiosError) => {
      // Network error handling
      if (!error.response) {
        return Promise.reject(new ApiError('Network error, please check your connection', -1));
      }
      const { status, data } = error.response as AxiosResponse;
      // Authentication related errors
      if (status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
      // Format error message
      const message = data?.message || error.message || 'Request failed';
      const code = data?.code || status;
      return Promise.reject(new ApiError(message, code, data));
    }
  );
}

// Create axios instance factory
function createAxiosInstance(baseURL?: string): AxiosInstance {
  const inst = axios.create({
    baseURL: baseURL || API_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  setupInterceptors(inst);
  return inst;
}

// Default instance
const defaultInstance = createAxiosInstance();

// Request method wrapper, supports baseURL parameter
export const request = {
  get: <T = unknown>(url: string, config?: RequestConfig) => {
    const inst = config?.baseURL ? createAxiosInstance(config.baseURL) : defaultInstance;
    return inst.get<unknown, T>(url, config);
  },
  post: <T = unknown>(url: string, data?: unknown, config?: RequestConfig) => {
    const inst = config?.baseURL ? createAxiosInstance(config.baseURL) : defaultInstance;
    return inst.post<unknown, T>(url, data, config);
  },
  put: <T = unknown>(url: string, data?: unknown, config?: RequestConfig) => {
    const inst = config?.baseURL ? createAxiosInstance(config.baseURL) : defaultInstance;
    return inst.put<unknown, T>(url, data, config);
  },
  delete: <T = unknown>(url: string, config?: RequestConfig) => {
    const inst = config?.baseURL ? createAxiosInstance(config.baseURL) : defaultInstance;
    return inst.delete<unknown, T>(url, config);
  },
  patch: <T = unknown>(url: string, data?: unknown, config?: RequestConfig) => {
    const inst = config?.baseURL ? createAxiosInstance(config.baseURL) : defaultInstance;
    return inst.patch<unknown, T>(url, data, config);
  },
};

export default request;
