/**
 * Application route constants
 * Central place to manage all application routes
 */

export const ROUTES = {
  // Site (Client) routes
  SITE: {
    HOME: '/',
    ABOUT: '/about',
    PRODUCTS: '/products',
    CONTACT: '/contact',
  },
  
  // Auth routes
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },
  
  // Console (Admin) routes
  CONSOLE: {
    HOME: '/console',
    ANALYTICS: '/console/analytics',
    SETTINGS: '/console/settings',
    USERS: '/console/users',
    ORDERS: '/console/orders',
    PRODUCTS: '/console/products',
    FILTERS: '/console/filters',
    TRASH: '/console/trash',
  }
} as const;

// Type-safe route utility functions
type RouteSegments = typeof ROUTES;
type SiteRoutes = keyof typeof ROUTES.SITE;
type AuthRoutes = keyof typeof ROUTES.AUTH;
type ConsoleRoutes = keyof typeof ROUTES.CONSOLE;

// Type helpers for route segments
export type SiteRoute = (typeof ROUTES.SITE)[SiteRoutes];
export type AuthRoute = (typeof ROUTES.AUTH)[AuthRoutes];
export type ConsoleRoute = (typeof ROUTES.CONSOLE)[ConsoleRoutes];

// Dynamic route builder with type checking
export function buildRoute(
  basePath: ConsoleRoute | AuthRoute | SiteRoute,
  params?: Record<string, string | number>
): string {
  let route = basePath;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      route = route.replace(`:${key}`, String(value));
    });
  }
  
  return route;
}

// Strongly typed navigation helpers
export function getSiteRoute(route: SiteRoutes): string {
  return ROUTES.SITE[route];
}

export function getAuthRoute(route: AuthRoutes): string {
  return ROUTES.AUTH[route];
}

export function getConsoleRoute(route: ConsoleRoutes): string {
  return ROUTES.CONSOLE[route];
}
