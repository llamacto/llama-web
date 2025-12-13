import { PropsWithChildren } from 'react';
import { Icons } from '@/components/ui/icons';

/**
 * Shared layout for all authentication related pages
 * This creates a consistent experience for login, register, password reset, etc.
 */
export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-md">
        {/* Logo and brand */}
        <div className="mb-8 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <Icons.Logo className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Llama Web
            </span>
          </div>
          <p className="text-center text-sm text-muted-foreground max-w-sm">
            Modern web scaffold for fast product delivery
          </p>
        </div>
        
        {/* Auth content (login, register, etc.) */}
        {children}
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <div>
            &copy; {new Date().getFullYear()} Llama Web. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
