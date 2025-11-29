// Authentication state management
// Optimized with Zustand and React Query for performance

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createSelectors } from './utils/selectors';
import { authService } from '@/services/auth';
import type { User, SystemFeatures, SetupStatus } from '@/types/auth';

interface AuthState {
  // Core auth state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // System state
  systemFeatures: SystemFeatures | null;
  setupStatus: SetupStatus | null;
  isSystemReady: boolean;
  
  // Error handling
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSystemFeatures: (features: SystemFeatures | null) => void;
  setSetupStatus: (status: SetupStatus) => void;
  
  // Complex actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  initializeAuth: () => Promise<void>;
  
  // Reset
  reset: () => void;
}

// Default state
const defaultState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  systemFeatures: null,
  setupStatus: null,
  isSystemReady: false,
  error: null,
};

/**
 * Authentication store with persistence and optimized updates
 */
const useAuthStoreBase = create<AuthState>()(
  persist(
    (set, get) => ({
      ...defaultState,
      
      // Simple setters
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user,
        error: null 
      }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      setSystemFeatures: (systemFeatures) => set({ 
        systemFeatures,
        isSystemReady: true 
      }),
      
      setSetupStatus: (setupStatus) => set({ setupStatus }),
      
      // Complex auth actions
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.login({ email, password });
          
          // Store tokens
          authService.setRefreshToken(response.tokens.refresh_token);
          authService.setUserProfile(response.user);
          
          set({ 
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null 
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'Login failed',
            isLoading: false,
            isAuthenticated: false,
            user: null 
          });
          throw error;
        }
      },
      
      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.register({ name, email, password });
          
          if (response.result === 'success') {
            // After successful registration, auto-login
            await get().login(email, password);
          }
        } catch (error: any) {
          set({ 
            error: error.message || 'Registration failed',
            isLoading: false 
          });
          throw error;
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        
        try {
          await authService.logout();
        } catch (error) {
          console.warn('Logout error:', error);
        } finally {
          set({
            ...defaultState,
            systemFeatures: get().systemFeatures, // Keep system features
            setupStatus: get().setupStatus, // Keep setup status
            isSystemReady: get().isSystemReady,
          });
        }
      },
      
      refreshProfile: async () => {
        if (!get().isAuthenticated) return;
        
        set({ isLoading: true });
        
        try {
          const user = await authService.getProfileEx();
          authService.setUserProfile(user);
          set({ user, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.message || 'Failed to refresh profile',
            isLoading: false 
          });
          
          // If profile fetch fails due to auth, logout
          if (error.code === 401 || error.status === 401) {
            get().logout();
          }
        }
      },
      
      initializeAuth: async () => {
        set({ isLoading: true });
        
        try {
          // Load system features and setup status in parallel
          const [systemFeatures, setupStatus] = await Promise.all([
            authService.getSystemFeatures().catch(() => null),
            authService.getSetupStatus().catch(() => null),
          ]);
          
          set({ 
            systemFeatures,
            setupStatus,
            isSystemReady: true 
          });
          
          // Check if user is authenticated
          if (authService.isAuthenticated()) {
            // Try to load cached user first for better UX
            const cachedUser = authService.getUserProfile();
            if (cachedUser) {
              set({ 
                user: cachedUser,
                isAuthenticated: true 
              });
            }
            
            // Then refresh from server
            await get().refreshProfile();
          }
        } catch (error: any) {
          console.error('Auth initialization failed:', error);
          set({ 
            error: 'System initialization failed',
            isSystemReady: false 
          });
        } finally {
          set({ isLoading: false });
        }
      },
      
      reset: () => set(defaultState),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        systemFeatures: state.systemFeatures,
        setupStatus: state.setupStatus,
        isSystemReady: state.isSystemReady,
      }),
    }
  )
);

/**
 * Auth store with selectors for optimized component updates
 * 
 * @example
 * // Using individual selectors (preferred for performance)
 * const user = useAuthStore.use.user();
 * const login = useAuthStore.use.login();
 * 
 * // Or using the entire store
 * const { user, login } = useAuthStore();
 */
export const useAuthStore = createSelectors(useAuthStoreBase);

// Derived selectors for computed values
export const authSelectors = {
  isAdmin: (state: AuthState) => 
    state.user?.account_role?.role_type === 'super_admin' || 
    state.user?.account_role?.role_type === 'admin',
  
  isSuperAdmin: (state: AuthState) => 
    state.user?.account_role?.role_type === 'super_admin',
  
  needsSetup: (state: AuthState) => 
    state.setupStatus?.step === 'not_started',
  
  canRegister: (state: AuthState) => 
    state.systemFeatures?.is_allow_register ?? false,
  
  hasEmailLogin: (state: AuthState) => 
    state.systemFeatures?.enable_email_password_login ?? true,
  
  hasSocialLogin: (state: AuthState) => 
    state.systemFeatures?.enable_social_oauth_login ?? false,
};

// Convenience hooks for common patterns
export const useCurrentUser = () => useAuthStore.use.user();
export const useIsAuthenticated = () => useAuthStore.use.isAuthenticated();
export const useAuthLoading = () => useAuthStore.use.isLoading();
export const useAuthError = () => useAuthStore.use.error(); 