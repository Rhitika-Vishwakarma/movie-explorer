export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit?: number;
}

export interface SearchParams extends PaginationParams {
  query: string;
}

export interface TMDBConfig {
  apiKey: string;
  baseUrl: string;
  imageBaseUrl: string;
}