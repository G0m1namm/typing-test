import { apiFetch } from '../apiClient';

global.fetch = jest.fn();

describe('apiFetch', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return data when the response is successful', async () => {
        const mockData = { message: 'Success' };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => mockData,
        });

        const response = await apiFetch<typeof mockData>(`${process.env.REACT_APP_API_BASE_URL}/leaderboard`);

        expect(response).toEqual({
            data: mockData,
            error: null,
            status: 200,
        });
    });

    it('should return an error when the response is not successful', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        const response = await apiFetch(`${process.env.REACT_APP_API_BASE_URL}/leaderboard`);

        expect(response).toEqual({
            data: null,
            error: 'HTTP error! status: 404',
            status: 404,
        });
    });

    it('should return an error when fetch throws an error', async () => {
        const mockError = new Error('Network error');
        (fetch as jest.Mock).mockRejectedValueOnce(mockError);

        const response = await apiFetch(`${process.env.REACT_APP_API_BASE_URL}/leaderboard`);

        expect(response).toEqual({
            data: null,
            error: mockError.message,
        });
    });
});