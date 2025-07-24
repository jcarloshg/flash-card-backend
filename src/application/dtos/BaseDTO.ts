// Base DTO interface
export interface DTO {
  readonly [key: string]: any;
}

// Request DTO base class
export abstract class RequestDTO implements DTO {
  abstract validate(): void;
}

// Response DTO base class
export abstract class ResponseDTO implements DTO {
  readonly timestamp: Date;

  constructor() {
    this.timestamp = new Date();
  }
}

// Pagination DTO
export class PaginationDTO {
  readonly page: number;
  readonly limit: number;
  readonly offset: number;

  constructor(page: number = 1, limit: number = 10) {
    this.page = Math.max(1, page);
    this.limit = Math.max(1, Math.min(100, limit)); // Max 100 items per page
    this.offset = (this.page - 1) * this.limit;
  }
}

// Paginated Response DTO
export class PaginatedResponseDTO<T> extends ResponseDTO {
  readonly data: T[];
  readonly pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  constructor(data: T[], page: number, limit: number, total: number) {
    super();
    this.data = data;
    this.pagination = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    };
  }
}
