/**
 * Orders module store
 * Manages orders-specific state, caching, and UI state
 */
import { create } from 'zustand';
import { createSelectors } from '@/store/utils/selectors';
import { queryClient } from '@/lib/query-client';
import { eventBus } from '@/lib/event-bus';

// Order status enum
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

// Order interface
export interface Order {
  id: string;
  customerId: string;
  products: OrderProduct[];
  status: OrderStatus;
  total: number;
  createdAt: string;
  updatedAt: string;
}

// Order product interface
export interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

// Order filters interface
export interface OrderFilters {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  search?: string;
}

// Order store state interface
interface OrderState {
  // UI State
  selectedOrderId: string | null;
  filters: OrderFilters;
  viewMode: 'list' | 'grid';
  
  // Cache state (used alongside React Query)
  recentOrders: Order[];
  
  // Actions
  selectOrder: (id: string | null) => void;
  setFilters: (filters: Partial<OrderFilters>) => void;
  resetFilters: () => void;
  setViewMode: (mode: 'list' | 'grid') => void;
  cacheRecentOrders: (orders: Order[]) => void;
  
  // Order operations (these would typically trigger API calls)
  cancelOrder: (orderId: string) => Promise<void>;
}

// Default filters
const DEFAULT_FILTERS: OrderFilters = {
  status: undefined,
  startDate: undefined,
  endDate: undefined,
  search: '',
};

/**
 * Order store implementation
 */
const useOrderStoreBase = create<OrderState>()((set, get) => ({
  // Initial state
  selectedOrderId: null,
  filters: { ...DEFAULT_FILTERS },
  viewMode: 'list',
  recentOrders: [],
  
  // Actions
  selectOrder: (id) => set({ selectedOrderId: id }),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  
  resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),
  
  setViewMode: (mode) => set({ viewMode: mode }),
  
  cacheRecentOrders: (orders) => set({ recentOrders: orders }),
  
  // Order operations
  cancelOrder: async (orderId) => {
    try {
      // This would typically call an API
      // await orderService.cancelOrder(orderId);
      
      // Update local cache
      set((state) => ({
        recentOrders: state.recentOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: OrderStatus.CANCELLED } 
            : order
        )
      }));
      
      // Invalidate queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders', orderId] });
      
      // Publish event for other modules
      eventBus.publish('order:cancelled', { orderId });
    } catch (error) {
      console.error('Failed to cancel order:', error);
      throw error;
    }
  },
}));

/**
 * Order store with selectors for optimized component updates
 * 
 * @example
 * const selectedOrderId = useOrderStore.use.selectedOrderId();
 * const setFilters = useOrderStore.use.setFilters();
 */
export const useOrderStore = createSelectors(useOrderStoreBase);
