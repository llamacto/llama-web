import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Environment configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT || 30000);

// Request configuration type
export interface RequestConfig extends AxiosRequestConfig {
  // Custom configuration options
  skipAuth?: boolean; // Skip authentication
  skipErrorHandler?: boolean; // Skip error handling
  baseURL?: string; // Optional custom baseURL
}

// Response data type for ZGI API
export interface ApiResponse<T = unknown> {
  code?: number;
  data?: T;
  message?: string;
  success?: boolean;
  result?: string;
}

// Error type
export class ApiError extends Error {
  code: number | string;
  data?: unknown;
  status?: number;
  
  constructor(message: string, code: number | string, data?: unknown, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.data = data;
    this.status = status;
  }
}

// Token management utilities
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

const clearAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_profile');
  }
};

// Interceptor setup function
function setupInterceptors(instance: AxiosInstance) {
  // Request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig & RequestConfig) => {
      // Add authentication information
      if (!config.skipAuth) {
        const token = getAuthToken();
        if (token) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      
      // Add default content type
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
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
      const { data } = response;
      
      // Handle different response formats from ZGI API
      
      // Format 1: Direct data response (most endpoints)
      if (data && typeof data === 'object' && !('code' in data) && !('result' in data)) {
        return data;
      }
      
      // Format 2: Success result format
      if (data && data.result === 'success') {
        return data;
      }
      
      // Format 3: Standard API response with data field
      if (data && data.data !== undefined) {
        return data.data;
      }
      
      // Format 4: Error response with code and message
      if (data && data.code && data.code !== 200 && data.code !== 0) {
        throw new ApiError(
          data.message || 'Request failed', 
          data.code, 
          data, 
          response.status
        );
      }
      
      // Default: return the data as-is
      return data;
    },
    (error: AxiosError) => {
      // Network error handling
      if (!error.response) {
        return Promise.reject(new ApiError(
          'Network error, please check your connection', 
          'NETWORK_ERROR'
        ));
      }
      
      const { status, data } = error.response as AxiosResponse;
      
      // Authentication related errors
      if (status === 401) {
        clearAuthToken();
        
        // Only redirect if we're in the browser and not already on auth pages
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname;
          const isAuthPage = ['/login', '/register', '/setup'].some(path => 
            currentPath.startsWith(path)
          );
          
          if (!isAuthPage) {
            window.location.href = '/login';
          }
        }
      }
      
      // Format error message based on response
      let message = 'Request failed';
      let code: string | number = status;
      
      if (data && typeof data === 'object') {
        if (data.message) {
          message = data.message;
        } else if (data.error) {
          message = data.error;
        }
        
        if (data.code) {
          code = data.code;
        }
      }
      
      return Promise.reject(new ApiError(message, code, data, status));
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
  get: <T = unknown>(url: string, config?: RequestConfig): Promise<T> => {
    const inst = config?.baseURL ? createAxiosInstance(config.baseURL) : defaultInstance;
    return inst.get<unknown, T>(url, config);
  },
  
  post: <T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> => {
    const inst = config?.baseURL ? createAxiosInstance(config.baseURL) : defaultInstance;
    return inst.post<unknown, T>(url, data, config);
  },
  
  put: <T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> => {
    const inst = config?.baseURL ? createAxiosInstance(config.baseURL) : defaultInstance;
    return inst.put<unknown, T>(url, data, config);
  },
  
  delete: <T = unknown>(url: string, config?: RequestConfig): Promise<T> => {
    const inst = config?.baseURL ? createAxiosInstance(config.baseURL) : defaultInstance;
    return inst.delete<unknown, T>(url, config);
  },
  
  patch: <T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> => {
    const inst = config?.baseURL ? createAxiosInstance(config.baseURL) : defaultInstance;
    return inst.patch<unknown, T>(url, data, config);
  },
};

// Export utilities for external use
export const requestUtils = {
  getAuthToken,
  clearAuthToken,
  createInstance: createAxiosInstance,
};

export default request;

