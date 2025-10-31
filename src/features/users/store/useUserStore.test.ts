import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserStore } from './useUserStore';
import type { User } from '../types/user.types';

describe('useUserStore', () => {
  const mockUser1: User = {
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
  };

  const mockUser2: User = {
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
  };

  const mockUser3: User = {
    id: 3,
    name: 'Bob Johnson',
    username: 'bobjohnson',
    email: 'bob@example.com',
    address: {
      street: 'Douglas Extension',
      suite: 'Suite 847',
      city: 'McKenziehaven',
      zipcode: '59590-4157',
      geo: {
        lat: '-68.6102',
        lng: '-47.0653',
      },
    },
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    company: {
      name: 'Romaguera-Jacobson',
      catchPhrase: 'Face to face bifurcated interface',
      bs: 'e-enable strategic applications',
    },
  };

  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useUserStore());
    act(() => {
      result.current.setUserList([]);
      result.current.setSelectedUser(null as any);
    });
  });

  it('should have initial state', () => {
    // Act
    const { result } = renderHook(() => useUserStore());

    // Assert
    expect(result.current.userList).toEqual([]);
    expect(result.current.selectedUser).toBeNull();
  });

  describe('setUserList', () => {
    it('should set user list', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());
      const mockUsers = [mockUser1, mockUser2];

      // Act
      act(() => {
        result.current.setUserList(mockUsers);
      });

      // Assert
      expect(result.current.userList).toEqual(mockUsers);
      expect(result.current.userList).toHaveLength(2);
    });

    it('should replace existing user list', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUserList([mockUser1]);
      });

      // Act
      act(() => {
        result.current.setUserList([mockUser2, mockUser3]);
      });

      // Assert
      expect(result.current.userList).toEqual([mockUser2, mockUser3]);
      expect(result.current.userList).toHaveLength(2);
    });

    it('should set empty array', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUserList([mockUser1, mockUser2]);
      });

      // Act
      act(() => {
        result.current.setUserList([]);
      });

      // Assert
      expect(result.current.userList).toEqual([]);
      expect(result.current.userList).toHaveLength(0);
    });
  });

  describe('setSelectedUser', () => {
    it('should set selected user', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      // Act
      act(() => {
        result.current.setSelectedUser(mockUser1);
      });

      // Assert
      expect(result.current.selectedUser).toEqual(mockUser1);
    });

    it('should replace existing selected user', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setSelectedUser(mockUser1);
      });

      // Act
      act(() => {
        result.current.setSelectedUser(mockUser2);
      });

      // Assert
      expect(result.current.selectedUser).toEqual(mockUser2);
    });
  });

  describe('addUser', () => {
    it('should add user to empty list', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      // Act
      act(() => {
        result.current.addUser(mockUser1);
      });

      // Assert
      expect(result.current.userList).toEqual([mockUser1]);
      expect(result.current.userList).toHaveLength(1);
    });

    it('should add user to existing list', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUserList([mockUser1]);
      });

      // Act
      act(() => {
        result.current.addUser(mockUser2);
      });

      // Assert
      expect(result.current.userList).toEqual([mockUser1, mockUser2]);
      expect(result.current.userList).toHaveLength(2);
    });

    it('should add multiple users', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      // Act
      act(() => {
        result.current.addUser(mockUser1);
        result.current.addUser(mockUser2);
        result.current.addUser(mockUser3);
      });

      // Assert
      expect(result.current.userList).toEqual([
        mockUser1,
        mockUser2,
        mockUser3,
      ]);
      expect(result.current.userList).toHaveLength(3);
    });

    it('should not mutate original array', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());
      const originalList = [mockUser1];

      act(() => {
        result.current.setUserList(originalList);
      });

      // Act
      act(() => {
        result.current.addUser(mockUser2);
      });

      // Assert
      expect(originalList).toEqual([mockUser1]);
      expect(result.current.userList).toEqual([mockUser1, mockUser2]);
    });
  });

  describe('editUser', () => {
    it('should edit existing user', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUserList([mockUser1, mockUser2]);
      });

      const updatedUser: User = {
        ...mockUser1,
        name: 'John Updated',
        email: 'johnupdated@example.com',
      };

      // Act
      act(() => {
        result.current.editUser(updatedUser);
      });

      // Assert
      expect(result.current.userList[0]).toEqual(updatedUser);
      expect(result.current.userList[0].name).toBe('John Updated');
      expect(result.current.userList[0].email).toBe('johnupdated@example.com');
      expect(result.current.userList[1]).toEqual(mockUser2);
      expect(result.current.userList).toHaveLength(2);
    });

    it('should not change list if user not found', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUserList([mockUser1, mockUser2]);
      });

      const nonExistentUser: User = {
        ...mockUser3,
        id: 999,
      };

      // Act
      act(() => {
        result.current.editUser(nonExistentUser);
      });

      // Assert
      expect(result.current.userList).toEqual([mockUser1, mockUser2]);
      expect(result.current.userList).toHaveLength(2);
    });

    it('should edit user in middle of list', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUserList([mockUser1, mockUser2, mockUser3]);
      });

      const updatedUser: User = {
        ...mockUser2,
        name: 'Jane Updated',
      };

      // Act
      act(() => {
        result.current.editUser(updatedUser);
      });

      // Assert
      expect(result.current.userList[0]).toEqual(mockUser1);
      expect(result.current.userList[1]).toEqual(updatedUser);
      expect(result.current.userList[1].name).toBe('Jane Updated');
      expect(result.current.userList[2]).toEqual(mockUser3);
    });

    it('should not mutate original array', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());
      const originalList = [mockUser1, mockUser2];

      act(() => {
        result.current.setUserList(originalList);
      });

      const updatedUser: User = {
        ...mockUser1,
        name: 'John Updated',
      };

      // Act
      act(() => {
        result.current.editUser(updatedUser);
      });

      // Assert
      expect(originalList[0].name).toBe('John Doe');
    });
  });

  describe('deleteUser', () => {
    it('should delete user from list', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUserList([mockUser1, mockUser2, mockUser3]);
      });

      // Act
      act(() => {
        result.current.deleteUser(mockUser2);
      });

      // Assert
      expect(result.current.userList).toEqual([mockUser1, mockUser3]);
      expect(result.current.userList).toHaveLength(2);
    });

    it('should delete first user', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUserList([mockUser1, mockUser2, mockUser3]);
      });

      // Act
      act(() => {
        result.current.deleteUser(mockUser1);
      });

      // Assert
      expect(result.current.userList).toEqual([mockUser2, mockUser3]);
      expect(result.current.userList).toHaveLength(2);
    });

    it('should delete last user', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUserList([mockUser1, mockUser2, mockUser3]);
      });

      // Act
      act(() => {
        result.current.deleteUser(mockUser3);
      });

      // Assert
      expect(result.current.userList).toEqual([mockUser1, mockUser2]);
      expect(result.current.userList).toHaveLength(2);
    });

    it('should delete only user in list', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUserList([mockUser1]);
      });

      // Act
      act(() => {
        result.current.deleteUser(mockUser1);
      });

      // Assert
      expect(result.current.userList).toEqual([]);
      expect(result.current.userList).toHaveLength(0);
    });

    it('should not change list if user not found', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUserList([mockUser1, mockUser2]);
      });

      const nonExistentUser: User = {
        ...mockUser3,
        id: 999,
      };

      // Act
      act(() => {
        result.current.deleteUser(nonExistentUser);
      });

      // Assert
      expect(result.current.userList).toEqual([mockUser1, mockUser2]);
      expect(result.current.userList).toHaveLength(2);
    });

    it('should not mutate original array', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());
      const originalList = [mockUser1, mockUser2];

      act(() => {
        result.current.setUserList(originalList);
      });

      // Act
      act(() => {
        result.current.deleteUser(mockUser1);
      });

      // Assert
      expect(originalList).toHaveLength(2);
      expect(result.current.userList).toHaveLength(1);
    });
  });

  describe('integration tests', () => {
    it('should handle complete workflow: add, edit, delete', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      // Add users
      act(() => {
        result.current.addUser(mockUser1);
        result.current.addUser(mockUser2);
      });

      expect(result.current.userList).toHaveLength(2);

      // Edit user
      const updatedUser: User = {
        ...mockUser1,
        name: 'John Updated',
      };

      act(() => {
        result.current.editUser(updatedUser);
      });

      expect(result.current.userList[0].name).toBe('John Updated');

      // Delete user
      act(() => {
        result.current.deleteUser(mockUser2);
      });

      expect(result.current.userList).toHaveLength(1);
      expect(result.current.userList[0]).toEqual(updatedUser);
    });

    it('should handle set and select operations', () => {
      // Arrange
      const { result } = renderHook(() => useUserStore());

      // Set user list
      act(() => {
        result.current.setUserList([mockUser1, mockUser2, mockUser3]);
      });

      expect(result.current.userList).toHaveLength(3);

      // Select a user
      act(() => {
        result.current.setSelectedUser(mockUser2);
      });

      expect(result.current.selectedUser).toEqual(mockUser2);

      // Delete selected user
      act(() => {
        result.current.deleteUser(mockUser2);
      });

      expect(result.current.userList).toHaveLength(2);
      // Note: selectedUser is not automatically cleared when deleted
      expect(result.current.selectedUser).toEqual(mockUser2);
    });
  });
});
