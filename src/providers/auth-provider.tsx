'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Authentication provider that initializes auth state on app startup
 * Should be wrapped around the entire app to ensure auth is initialized
 * before any components that depend on auth state are rendered
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const initializeAuth = useAuthStore.use.initializeAuth();
  const isSystemReady = useAuthStore.use.isSystemReady();
  const setSystemFeatures = useAuthStore.use.setSystemFeatures();

  useEffect(() => {
    // Only initialize auth if API base URL is configured
    const apiBase = process.env.NEXT_PUBLIC_UPSTREAM_API_BASE || process.env.NEXT_PUBLIC_ZGI_API_BASE;
    
    if (apiBase) {
      // Initialize authentication with API calls
      initializeAuth();
    } else {
      // Skip API calls, just mark system as ready for better UX
      setSystemFeatures(null);
    }
  }, [initializeAuth, setSystemFeatures]);

  // Don't show loading state if API is not configured
  // This allows the app to work without backend for demo/development
  const shouldShowLoading = (process.env.NEXT_PUBLIC_UPSTREAM_API_BASE || process.env.NEXT_PUBLIC_ZGI_API_BASE) && !isSystemReady;
  
  if (shouldShowLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 