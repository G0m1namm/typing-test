export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    status?: number;
}

export async function apiFetch<T>(
    url: string,
    options?: RequestInit
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
            error: (error as Error).message || 'An unexpected error occurred',
        };
    }
}