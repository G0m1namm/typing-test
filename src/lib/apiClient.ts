export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status?: number;
}

/**
 * Generic API fetch wrapper with error handling
 *
 * @template T The expected return type of the API call
 * @param url The endpoint URL to fetch from
 * @param options Optional fetch configuration
 * @returns Promise containing either the data or error information
 *
 * @example
 * ```typescript
 * const response = await apiFetch<User>('/api/users/1');
 * if (response.error) {
 *   console.error(response.error);
 * } else {
 *   console.log(response.data);
 * }
 * ```
 */
export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      return {
        data: null,
        error: `HTTP error! status: ${response.status}`,
        status: response.status,
      };
    }

    const data: T = await response.json();

    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (error) {
    return {
      data: null,
      error: (error as Error).message || "An unexpected error occurred",
    };
  }
}
