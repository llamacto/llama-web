// 订单相关 service 示例，演示多 baseURL 支持
import { request } from '@/lib/request';

// 假设有两个后端服务
const ORDER_API = 'https://order.example.com/api';
const PAYMENT_API = 'https://pay.example.com/api';

// 获取订单详情（走订单服务）
export function getOrderDetail(orderId: string) {
  return request.get<OrderDetail>(`/orders/${orderId}`, { baseURL: ORDER_API });
}

// 创建订单（走订单服务）
export function createOrder(data: CreateOrderDto) {
  return request.post<OrderDetail>(`/orders`, data, { baseURL: ORDER_API });
}

// 查询支付状态（走支付服务）
export function getPaymentStatus(orderId: string) {
  return request.get<PaymentStatus>(`/payment/status/${orderId}`, { baseURL: PAYMENT_API });
}

// 类型定义（实际项目建议放到 src/types 或本模块 types.ts）
export interface OrderDetail {
  id: string;
  amount: number;
  status: string;
}

export interface CreateOrderDto {
  productId: string;
  quantity: number;
}

export interface PaymentStatus {
  orderId: string;
  paid: boolean;
  paidAt?: string;
} 