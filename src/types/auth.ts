// Authentication and user account types.
// Generic types for scaffold - customize based on your backend.

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  avatar_url?: string | null;
  created_at?: number;
  status?: 'active' | 'pending' | 'inactive';
  role?: 'admin' | 'user';
}

// Authentication request/response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface SetupRequest {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  result: 'success';
}

// System features and configuration
export interface SystemFeatures {
  enable_email_password_login: boolean;
  enable_social_oauth_login: boolean;
  is_allow_register: boolean;
}

// Setup status
export interface SetupStatus {
  step: 'not_started' | 'finished';
  setup_at?: string;
}

// Paginated response
export interface PaginatedResponse<T> {
  page: number;
  limit: number;
  total: number;
  has_more: boolean;
  data: T[];
}

export type UserList = PaginatedResponse<User>;

// Auth state management
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  systemFeatures: SystemFeatures | null;
  setupStatus: SetupStatus | null;
}

// API error types
export interface ApiError {
  code: string;
  message: string;
  status?: number;
}

// Form validation types
export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterFormData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

// OAuth provider types
export type OAuthProvider = 'google' | 'github' | 'apple';

export interface OAuthConfig {
  enabled: boolean;
  client_id?: string;
  redirect_uri?: string;
} 