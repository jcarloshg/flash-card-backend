// Common TypeScript types and interfaces

// Generic API Response
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

// Paginated Response
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Query Parameters
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  [key: string]: any;
}

// Database Entity Base
export interface EntityBase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Audit fields
export interface AuditFields {
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

// Request with User (for authenticated routes)
export interface AuthenticatedRequest {
  user: {
    id: string;
    email: string;
    roles: string[];
  };
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Nullable<T> = T | null;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Event types
export interface DomainEventBase {
  eventId: string;
  eventType: string;
  aggregateId: string;
  occurredAt: Date;
  version: number;
}

// Result pattern
export interface SuccessResult<T> {
  success: true;
  data: T;
}

export interface FailureResult {
  success: false;
  error: string;
  code?: string;
}

export type Result<T> = SuccessResult<T> | FailureResult;

// Environment types
export type Environment = 'development' | 'production' | 'test' | 'staging';

// Log levels
export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Status types
export type Status = 'active' | 'inactive' | 'pending' | 'suspended';

// File types
export interface FileUpload {
  filename: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}
