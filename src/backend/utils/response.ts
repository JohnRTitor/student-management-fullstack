type ApiErrorDetails = unknown;

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: ApiErrorDetails;
  };
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function ok<T>(data: T, message?: string): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
    ...(message ? { message } : {}),
  };
}

export function fail(
  message: string,
  options?: {
    code?: string;
    details?: ApiErrorDetails;
  },
): ApiErrorResponse {
  return {
    success: false,
    error: {
      message,
      ...(options?.code ? { code: options.code } : {}),
      ...(options?.details !== undefined ? { details: options.details } : {}),
    },
  };
}
