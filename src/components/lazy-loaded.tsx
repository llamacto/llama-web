// Lazy-loaded components for better performance
// These components are only loaded when actually needed

import dynamic from 'next/dynamic';

// Loading component for lazy-loaded items
const LoadingFallback = () => (
  <div className="flex h-96 items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Lazy load heavy data table component
// Reduces initial bundle size by ~200KB
export const LazyDataTable = dynamic(
  () => import('@/components/features/tables').then((mod) => ({ default: mod.DataTable })),
  {
    loading: () => <LoadingFallback />,
    ssr: false, // Data tables often have client-side interactions
  }
);

// Lazy load chart component
// Charts are usually heavy and client-side only
export const LazyChartAreaInteractive = dynamic(
  () => import('@/components/features/charts').then((mod) => ({ default: mod.ChartAreaInteractive })),
  {
    loading: () => <LoadingFallback />,
    ssr: false,
  }
);
