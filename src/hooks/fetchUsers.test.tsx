import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import useFetchUsers, { User } from './fetchUsers';

jest.mock('axios');

describe('useFetchUsers', () => {
    const responseData: User[] = [
        {
            user_id: 1,
            profile_image: 'user.jpg',
            display_name: 'John Doe',
            reputation: 100,
            location: 'Johannesburg'
        },
        {
            user_id: 2,
            profile_image: 'user.jpg',
            display_name: 'Mike Smith',
            reputation: 1000,
            location: 'Johannesburg'
        },
        {
            user_id: 3,
            profile_image: 'user.jpg',
            display_name: 'Tshepo Bester',
            reputation: 1001,
            location: 'Johannesburg'
        }
    ];

    beforeEach(() => {
        (axios.get as jest.Mock).mockClear();
    });

    it('should fetch users and update state', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: { items: responseData } });

        const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());

        expect(result.current.loading).toBe(true);
        expect(result.current.data).toEqual([]);
        expect(result.current.error).toBe(null);

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toEqual(responseData);
        expect(result.current.error).toBe(null);
    });

    it('should handle error', async () => {
        const error = new Error('Failed to fetch users');
        (axios.get as jest.Mock).mockRejectedValueOnce(error);

        const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());

        expect(result.current.loading).toBe(true);
        expect(result.current.data).toEqual([]);
        expect(result.current.error).toBe(null);

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toEqual([]);
        expect(result.current.error).toBe(error);
    });
});
