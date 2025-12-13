// Authentication and user account types.
// Based on upstream API documentation.

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  avatar_url?: string | null;
  is_password_set: boolean;
  interface_language: string;
  interface_theme: 'light' | 'dark';
  timezone: string;
  last_login_at?: number | null;
  last_login_ip?: string | null;
  created_at: number;
  status?: 'active' | 'pending' | 'inactive';
  group_role?: 'admin' | 'normal';
  account_role?: {
    role_type: 'super_admin' | 'admin' | 'normal';
  } | null;
  extension?: {
    mobile?: string | null;
    wechat?: string | null;
    address?: string | null;
    gender?: string | null;
  } | null;
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
  sso_enforced_for_signin: boolean;
  sso_enforced_for_signin_protocol: string;
  sso_enforced_for_web: boolean;
  sso_enforced_for_web_protocol: string;
  enable_web_sso_switch_component: boolean;
  enable_marketplace: boolean;
  max_plugin_package_size: number;
  enable_email_code_login: boolean;
  enable_email_password_login: boolean;
  enable_social_oauth_login: boolean;
  is_allow_register: boolean;
  is_allow_create_workspace: boolean;
  is_email_setup: boolean;
  license: {
    status: string;
    expired_at: string;
  };
  is_public_deployment: boolean;
}

// Setup status
export interface SetupStatus {
  step: 'not_started' | 'finished';
  setup_at?: string;
}

// Paginated response for user lists
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
export type OAuthProvider = 'google' | 'apple' | 'meta' | 'github';

export interface OAuthConfig {
  enabled: boolean;
  client_id?: string;
  redirect_uri?: string;
} 