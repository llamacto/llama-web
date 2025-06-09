// Authentication service layer for ZGI platform
// Implements clean architecture with proper error handling and type safety

import { request } from '@/lib/request';
import type {
  User,
  LoginRequest,
  RegisterRequest,
  SetupRequest,
  AuthResponse,
  SystemFeatures,
  SetupStatus,
  UserList,
  ApiError,
} from '@/lib/types/auth';

// Login response with token data
interface LoginResponse {
  result: 'success';
  data: {
    access_token: string;
    refresh_token: string;
  };
}

// API endpoints configuration
const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/console/api/login',
  LOGOUT: '/console/api/logout',
  REGISTER: '/console/api/account/register',
  
  // User profile
  PROFILE: '/console/api/account/profile',
  PROFILE_EX: '/console/api/account-ex/profile',
  UPDATE_PROFILE: '/console/api/account/profile',
  
  // Setup
  SETUP_STATUS: '/console/api/setup',
  SETUP: '/console/api/setup',
  
  // System
  SYSTEM_FEATURES: '/console/api/system-features',
  
  // Account management
  ACCOUNT_LIST: '/console/api/account-ex/list',
} as const;

// Base URL from environment
const ZGI_API_BASE = process.env.NEXT_PUBLIC_ZGI_API_BASE || 'https://zgi-api.emkok.com';

/**
 * Authentication service class
 * Provides clean interface for all authentication-related operations
 */
export class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private getConfig() {
    return { baseURL: ZGI_API_BASE };
  }

  /**
   * System setup and status
   */
  async getSetupStatus(): Promise<SetupStatus> {
    return request.get<SetupStatus>(API_ENDPOINTS.SETUP_STATUS, {
      ...this.getConfig(),
      skipAuth: true,
    });
  }

  async setup(data: SetupRequest): Promise<AuthResponse> {
    return request.post<AuthResponse>(API_ENDPOINTS.SETUP, data, {
      ...this.getConfig(),
      skipAuth: true,
    });
  }

  async getSystemFeatures(): Promise<SystemFeatures> {
    return request.get<SystemFeatures>(API_ENDPOINTS.SYSTEM_FEATURES, {
      ...this.getConfig(),
      skipAuth: true,
    });
  }

  /**
   * Authentication operations
   */
  async login(credentials: LoginRequest): Promise<{ user: User; tokens: { access_token: string; refresh_token: string } }> {
    // Note: Login API requires 'name' field according to docs, but we'll try with email only first
    const loginData = {
      email: credentials.email,
      password: credentials.password,
      // The API docs show 'name' as required, but we'll omit it for now
    };

    const response = await request.post<LoginResponse>(
      API_ENDPOINTS.LOGIN,
      loginData,
      {
        ...this.getConfig(),
        skipAuth: true,
      }
    );

    if (response.result === 'success' && response.data?.access_token) {
      // Store the access token immediately
      this.setAuthToken(response.data.access_token);
      
      // Fetch user profile with the new token
      const user = await this.getProfileEx();
      
      return {
        user,
        tokens: response.data,
      };
    }

    throw new Error('Login failed: Invalid response format');
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return request.post<AuthResponse>(API_ENDPOINTS.REGISTER, userData, {
      ...this.getConfig(),
      skipAuth: true,
    });
  }

  async logout(): Promise<void> {
    try {
      await request.post(API_ENDPOINTS.LOGOUT, {}, this.getConfig());
    } catch (error) {
      // Even if logout fails on server, we should clear local state
      console.warn('Logout request failed:', error);
    } finally {
      this.clearAuthData();
    }
  }

  /**
   * User profile operations
   */
  async getProfile(): Promise<User> {
    return request.get<User>(API_ENDPOINTS.PROFILE, this.getConfig());
  }

  async getProfileEx(): Promise<User> {
    return request.get<User>(API_ENDPOINTS.PROFILE_EX, this.getConfig());
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return request.patch<User>(API_ENDPOINTS.UPDATE_PROFILE, data, this.getConfig());
  }

  /**
   * Account management (admin operations)
   */
  async getAccountList(page: number = 1, limit: number = 30): Promise<UserList> {
    return request.get<UserList>(
      `${API_ENDPOINTS.ACCOUNT_LIST}?page=${page}&limit=${limit}`,
      this.getConfig()
    );
  }

  /**
   * Token management
   */
  setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_profile');
      localStorage.removeItem('refresh_token');
    }
  }

  /**
   * Local user data persistence
   */
  setUserProfile(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_profile', JSON.stringify(user));
    }
  }

  getUserProfile(): User | null {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user_profile');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  /**
   * Refresh token management
   */
  setRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('refresh_token', token);
    }
  }

  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refresh_token');
    }
    return null;
  }
}

// Singleton instance
export const authService = AuthService.getInstance();

/**
 * Convenience functions for direct usage
 */
export const authApi = {
  // Setup
  getSetupStatus: () => authService.getSetupStatus(),
  setup: (data: SetupRequest) => authService.setup(data),
  getSystemFeatures: () => authService.getSystemFeatures(),
  
  // Auth
  login: (credentials: LoginRequest) => authService.login(credentials),
  register: (userData: RegisterRequest) => authService.register(userData),
  logout: () => authService.logout(),
  
  // Profile
  getProfile: () => authService.getProfile(),
  getProfileEx: () => authService.getProfileEx(),
  updateProfile: (data: Partial<User>) => authService.updateProfile(data),
  
  // Admin
  getAccountList: (page?: number, limit?: number) => authService.getAccountList(page, limit),
  
  // Utils
  isAuthenticated: () => authService.isAuthenticated(),
} as const; 