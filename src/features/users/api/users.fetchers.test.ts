import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '@/shared/api/client';
import { USERS } from '@/shared/constants';
import type { User } from '../types/user.types';
import fetchUserList from './users.fetchers';

// Mock API client
vi.mock('@/shared/api/client', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('fetchUserList', () => {
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
      {
        id: 2,
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'jane@example.com',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
          geo: {
            lat: '-43.9509',
            lng: '-34.4618',
          },
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
          name: 'Deckow-Crist',
          catchPhrase: 'Proactive didactic contingency',
          bs: 'synergize scalable supply-chains',
        },
      },
    ];

    vi.mocked(api.get).mockResolvedValue({ data: mockUsers });

    // Act
    const result = await fetchUserList();

    // Assert
    expect(api.get).toHaveBeenCalledWith(USERS);
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUsers);
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('address');
    expect(result[0].address).toHaveProperty('geo');
    expect(result[0]).toHaveProperty('company');
  });

  it('should return empty array when no users found', async () => {
    // Arrange
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    // Act
    const result = await fetchUserList();

    // Assert
    expect(api.get).toHaveBeenCalledWith(USERS);
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it('should throw error when API call fails', async () => {
    // Arrange
    const mockError = new Error('Network error');
    vi.mocked(api.get).mockRejectedValue(mockError);

    // Act & Assert
    await expect(fetchUserList()).rejects.toThrow('Network error');
    expect(api.get).toHaveBeenCalledWith(USERS);
  });

  it('should handle API error with status code', async () => {
    // Arrange
    const mockError = {
      response: {
        status: 500,
        data: { message: 'Internal Server Error' },
      },
    };
    vi.mocked(api.get).mockRejectedValue(mockError);

    // Act & Assert
    await expect(fetchUserList()).rejects.toEqual(mockError);
    expect(api.get).toHaveBeenCalledWith(USERS);
  });

  it('should handle 404 error', async () => {
    // Arrange
    const mockError = {
      response: {
        status: 404,
        data: { message: 'Users not found' },
      },
    };
    vi.mocked(api.get).mockRejectedValue(mockError);

    // Act & Assert
    await expect(fetchUserList()).rejects.toEqual(mockError);
  });

  it('should return correct user data structure', async () => {
    // Arrange
    const mockUser: User = {
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
    };

    vi.mocked(api.get).mockResolvedValue({ data: [mockUser] });

    // Act
    const result = await fetchUserList();

    // Assert
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe('Test User');
    expect(result[0].email).toBe('test@example.com');
    expect(result[0].address.city).toBe('Test City');
    expect(result[0].address.geo.lat).toBe('0.0000');
    expect(result[0].company.name).toBe('Test Company');
  });
});
