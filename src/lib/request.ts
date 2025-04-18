import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Environment configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT || 10000);
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1';

// Request configuration type
export interface RequestConfig extends AxiosRequestConfig {
  // Custom configuration options
  skipAuth?: boolean; // Skip authentication
  skipErrorHandler?: boolean; // Skip error handling
}

// Response data type
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

// Error type
export class ApiError extends Error {
  code: number;
  data?: any;
  
  constructor(message: string, code: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.data = data;
  }
}

// Create axios instance
const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig & RequestConfig) => {
    // Add authentication information
    if (!config.skipAuth) {
      const token = localStorage.getItem('token');
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
      // Clear authentication information
      localStorage.removeItem('token');
      // Can add login page redirect logic here
      window.location.href = '/login';
    }
    
    // Format error message
    const message = data?.message || error.message || 'Request failed';
    const code = data?.code || status;
    
    return Promise.reject(new ApiError(message, code, data));
  }
);

// Request method wrapper
export const request = {
  get: <T = any>(url: string, config?: RequestConfig) => {
    return instance.get<any, T>(url, config);
  },
  post: <T = any>(url: string, data?: any, config?: RequestConfig) => {
    return instance.post<any, T>(url, data, config);
  },
  put: <T = any>(url: string, data?: any, config?: RequestConfig) => {
    return instance.put<any, T>(url, data, config);
  },
  delete: <T = any>(url: string, config?: RequestConfig) => {
    return instance.delete<any, T>(url, config);
  },
  patch: <T = any>(url: string, data?: any, config?: RequestConfig) => {
    return instance.patch<any, T>(url, data, config);
  },
};

export default request;
