// Authentication service layer
// Implements clean architecture with proper error handling and type safety

import { request } from '@/http';
import type {
  User,
  LoginRequest,
  RegisterRequest,
  SetupRequest,
  AuthResponse,
  SystemFeatures,
  SetupStatus,
  UserList,
} from '@/types/auth';

// Internal BFF endpoints (implemented as Next.js Route Handlers under /api/auth/*)
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  ME: '/auth/me',
  SETUP_STATUS: '/auth/setup-status',
  SETUP: '/auth/setup',
  SYSTEM_FEATURES: '/auth/system-features',
} as const;

// Generic backend proxy endpoint (implemented as Next.js Route Handler under /api/backend/*)
const BACKEND_PROXY_PREFIX = '/backend';

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
    return {};
  }

  /**
   * System setup and status
   */
  async getSetupStatus(): Promise<SetupStatus> {
    return request.get<SetupStatus>(AUTH_ENDPOINTS.SETUP_STATUS, this.getConfig());
  }

  async setup(data: SetupRequest): Promise<AuthResponse> {
    return request.post<AuthResponse>(AUTH_ENDPOINTS.SETUP, data, this.getConfig());
  }

  async getSystemFeatures(): Promise<SystemFeatures> {
    return request.get<SystemFeatures>(AUTH_ENDPOINTS.SYSTEM_FEATURES, this.getConfig());
  }

  /**
   * Authentication operations
   */
  async login(credentials: LoginRequest & { remember?: boolean }): Promise<User> {
    const result = await request.post<{ user: User }>(AUTH_ENDPOINTS.LOGIN, credentials, this.getConfig());
    return result.user;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return request.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, userData, this.getConfig());
  }

  async logout(): Promise<void> {
    try {
      await request.post(AUTH_ENDPOINTS.LOGOUT, {}, this.getConfig());
    } catch (error) {
      // Even if logout fails on server, we should clear local state
      console.warn('Logout request failed:', error);
    }
  }

  /**
   * User profile operations
   */
  async getProfile(): Promise<User> {
    return request.get<User>(`${BACKEND_PROXY_PREFIX}/console/api/account/profile`, this.getConfig());
  }

  async getProfileEx(): Promise<User> {
    const result = await request.get<{ user: User }>(AUTH_ENDPOINTS.ME, this.getConfig());
    return result.user;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return request.patch<User>(`${BACKEND_PROXY_PREFIX}/console/api/account/profile`, data, this.getConfig());
  }

  /**
   * Account management (admin operations)
   */
  async getAccountList(page: number = 1, limit: number = 30): Promise<UserList> {
    return request.get<UserList>(`${BACKEND_PROXY_PREFIX}/console/api/account-ex/list?page=${page}&limit=${limit}`, this.getConfig());
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
  login: (credentials: LoginRequest & { remember?: boolean }) => authService.login(credentials),
  register: (userData: RegisterRequest) => authService.register(userData),
  logout: () => authService.logout(),
  
  // Profile
  getProfile: () => authService.getProfile(),
  getProfileEx: () => authService.getProfileEx(),
  updateProfile: (data: Partial<User>) => authService.updateProfile(data),
  
  // Admin
  getAccountList: (page?: number, limit?: number) => authService.getAccountList(page, limit),
} as const; 