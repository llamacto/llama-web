'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, authSelectors } from '@/store/auth-store';
import { Icons } from '@/components/ui/icons';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  fallback?: React.ReactNode;
}

/**
 * Protected route component that handles authentication and authorization
 * Redirects to login if not authenticated or shows fallback if provided
 */
export function ProtectedRoute({ 
  children, 
  requireAdmin = false,
  fallback 
}: ProtectedRouteProps) {
  const router = useRouter();
  
  const isAuthenticated = useAuthStore.use.isAuthenticated();
  const isLoading = useAuthStore.use.isLoading();
  const user = useAuthStore.use.user();
  const isSystemReady = useAuthStore.use.isSystemReady();
  
  // Check admin requirements - pass full state to selector
  const isAdmin = user ? authSelectors.isAdmin(useAuthStore.getState()) : false;
  
  useEffect(() => {
    // Wait for system to be ready before making decisions
    if (!isSystemReady || isLoading) return;
    
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    // Check admin requirements
    if (requireAdmin && !isAdmin) {
      router.push('/console'); // Redirect to dashboard if admin required but not admin
      return;
    }
  }, [isAuthenticated, isLoading, isSystemReady, requireAdmin, isAdmin, router]);
  
  // Show loading while checking auth or system not ready
  if (!isSystemReady || isLoading) {
    return fallback || (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Icons.Spinner className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Show fallback if not authenticated or loading
  if (!isAuthenticated) {
    return fallback || (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Icons.Spinner className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }
  
  // Check admin authorization
  if (requireAdmin && !isAdmin) {
    return fallback || (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Icons.AlertCircle className="h-12 w-12 text-destructive" />
          <div>
            <h2 className="text-lg font-semibold">Access Denied</h2>
            <p className="text-sm text-muted-foreground">
              You don&apos;t have permission to access this page.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // Render children if all checks pass
  return <>{children}</>;
} 