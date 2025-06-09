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

  useEffect(() => {
    // Initialize authentication on app startup
    initializeAuth();
  }, [initializeAuth]);

  // Show a loading state while the auth system is initializing
  // This prevents flash of login screen for already authenticated users
  if (!isSystemReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Initializing ZGI...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 