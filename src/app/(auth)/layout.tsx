import { PropsWithChildren } from 'react';

/**
 * Shared layout for all authentication related pages
 * This creates a consistent experience for login, register, password reset, etc.
 */
export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {/* Logo or brand here */}
        <div className="mb-8 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
        </div>
        
        {/* Auth content (login, register, etc.) */}
        {children}
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <div>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
