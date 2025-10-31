import { renderHook, waitFor, wrapper } from '@/shared/test-utils/TestUtils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import fetchUserList from '../api/users.fetchers';
import type { User } from '../types/user.types';
import useUserList from './useUserList';

// Mock fetchUserList
vi.mock('../api/users.fetchers', () => ({
  default: vi.fn(),
}));

describe('useUserList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch user list successfully', async () => {
    // Arrange
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
    ];

    vi.mocked(fetchUserList).mockResolvedValue(mockUsers);

    // Act
    const { result } = renderHook(() => useUserList(), { wrapper });

    // Assert
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockUsers);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(fetchUserList).toHaveBeenCalledTimes(1);
  });

  it('should handle empty user list', async () => {
    // Arrange
    vi.mocked(fetchUserList).mockResolvedValue([]);

    // Act
    const { result } = renderHook(() => useUserList(), { wrapper });

    // Assert
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([]);
    expect(result.current.data).toHaveLength(0);
  });

  it('should handle error when fetching fails', async () => {
    // Arrange
    const mockError = new Error('Failed to fetch users');
    vi.mocked(fetchUserList).mockRejectedValue(mockError);

    // Act
    const { result } = renderHook(() => useUserList(), { wrapper });

    // Assert
    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle network error', async () => {
    // Arrange
    const networkError = {
      response: {
        status: 500,
        data: { message: 'Internal Server Error' },
      },
    };
    vi.mocked(fetchUserList).mockRejectedValue(networkError);

    // Act
    const { result } = renderHook(() => useUserList(), { wrapper });

    // Assert
    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(networkError);
    expect(result.current.isSuccess).toBe(false);
  });

  it('should return correct data structure', async () => {
    // Arrange
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        address: {
          street: 'Test Street',
          suite: 'Apt. 123',
          city: 'Test City',
          zipcode: '12345',
          geo: {
            lat: '0.0000',
            lng: '0.0000',
          },
        },
        phone: '123-456-7890',
        website: 'test.com',
        company: {
          name: 'Test Company',
          catchPhrase: 'Test Phrase',
          bs: 'test business',
        },
      },
    ];

    vi.mocked(fetchUserList).mockResolvedValue(mockUsers);

    // Act
    const { result } = renderHook(() => useUserList(), { wrapper });

    // Assert
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.[0].id).toBe(1);
    expect(result.current.data?.[0].name).toBe('Test User');
    expect(result.current.data?.[0].email).toBe('test@example.com');
    expect(result.current.data?.[0].address.city).toBe('Test City');
    expect(result.current.data?.[0].company.name).toBe('Test Company');
  });

  it('should have correct initial state', () => {
    // Arrange
    vi.mocked(fetchUserList).mockResolvedValue([]);

    // Act
    const { result } = renderHook(() => useUserList(), { wrapper });

    // Assert
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });
});
