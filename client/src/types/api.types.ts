export interface ApiResponse {
  message?: string;
}

export interface SearchParams {
  query?: string;
}

export interface AddFavoriteRequest {
  songId: string;
}

export interface AuthResponse {
  token: string;
}

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}
