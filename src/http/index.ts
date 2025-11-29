// HTTP layer exports
export { request, requestUtils, ApiError } from './request';
export type { RequestConfig, ApiResponse } from './request';
export type { ApiError as HttpError } from './types';

// Re-export for convenience
export { default } from './request';
