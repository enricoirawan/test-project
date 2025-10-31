import { render } from '@/shared/test-utils/TestUtils';
import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useUserList from '../hooks/useUserList';
import { useUserStore } from '../store/useUserStore';
import UserList from './UserList';

// Mock hooks
vi.mock('../hooks/useUserList');
vi.mock('../store/useUserStore');

// Mock child components
vi.mock('./UserItem', () => ({
  default: ({ user }: any) => (
    <div data-testid={`user-item-${user.id}`}>
      <span>{user.name}</span>
      <span>{user.email}</span>
    </div>
  ),
}));

vi.mock('./UserItemLoading', () => ({
  default: () => <div data-testid="user-item-loading">Loading...</div>,
}));

// Mock Chakra UI's useBreakpointValue
vi.mock('@chakra-ui/react', async () => {
  const actual = await vi.importActual('@chakra-ui/react');
  return {
    ...actual,
    useBreakpointValue: vi.fn(() => 5),
  };
});

describe('UserList', () => {
  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ];

  const mockSetUserList = vi.fn();
  const mockSetSelectedUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementation for useUserStore
    vi.mocked(useUserStore).mockReturnValue({
      userList: [],
      setUserList: mockSetUserList,
      selectedUser: null,
      setSelectedUser: mockSetSelectedUser,
    } as any);
  });

  describe('Loading State', () => {
    it('should render loading skeletons when data is being fetched', () => {
      vi.mocked(useUserList).mockReturnValue({
        data: undefined,
        isSuccess: false,
        isError: false,
        error: null,
      } as any);

      render(<UserList />);

      const loadingItems = screen.getAllByTestId('user-item-loading');
      expect(loadingItems).toHaveLength(10);
    });
  });

  describe('Success State', () => {
    it('should render user list when data is successfully fetched', async () => {
      // Mock store with users already populated
      vi.mocked(useUserStore).mockReturnValue({
        userList: mockUsers,
        setUserList: mockSetUserList,
        selectedUser: null,
        setSelectedUser: mockSetSelectedUser,
      } as any);

      vi.mocked(useUserList).mockReturnValue({
        data: mockUsers,
        isSuccess: true,
        isError: false,
        error: null,
      } as any);

      render(<UserList />);

      expect(screen.getByTestId('user-item-1')).toBeInTheDocument();
      expect(screen.getByTestId('user-item-2')).toBeInTheDocument();
    });

    it('should populate user store when data is fetched and store is empty', async () => {
      vi.mocked(useUserStore).mockReturnValue({
        userList: [],
        setUserList: mockSetUserList,
        selectedUser: null,
        setSelectedUser: mockSetSelectedUser,
      } as any);

      vi.mocked(useUserList).mockReturnValue({
        data: mockUsers,
        isSuccess: true,
        isError: false,
        error: null,
      } as any);

      render(<UserList />);

      await waitFor(() => {
        expect(mockSetUserList).toHaveBeenCalledWith(mockUsers);
      });
    });

    it('should NOT populate user store when store already has data', async () => {
      vi.mocked(useUserList).mockReturnValue({
        data: mockUsers,
        isSuccess: true,
        isError: false,
        error: null,
      } as any);

      vi.mocked(useUserStore).mockReturnValue({
        userList: mockUsers,
        setUserList: mockSetUserList,
      } as any);

      render(<UserList />);

      await waitFor(() => {
        expect(mockSetUserList).not.toHaveBeenCalled();
      });
    });

    it('should render users from store instead of query data', () => {
      const storeUsers = [
        { id: '3', name: 'Store User', email: 'store@example.com' },
      ];

      vi.mocked(useUserList).mockReturnValue({
        data: mockUsers,
        isSuccess: true,
        isError: false,
        error: null,
      } as any);

      vi.mocked(useUserStore).mockReturnValue({
        userList: storeUsers,
        setUserList: mockSetUserList,
      } as any);

      render(<UserList />);

      expect(screen.getByTestId('user-item-3')).toBeInTheDocument();
      expect(screen.queryByTestId('user-item-1')).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should render error message when fetch fails', () => {
      const errorMessage = 'Failed to fetch users';

      vi.mocked(useUserList).mockReturnValue({
        data: undefined,
        isSuccess: false,
        isError: true,
        error: new Error(errorMessage),
      } as any);

      render(<UserList />);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should render error icon when fetch fails', () => {
      vi.mocked(useUserList).mockReturnValue({
        data: undefined,
        isSuccess: false,
        isError: true,
        error: new Error('Network error'),
      } as any);

      const { container } = render(<UserList />);

      // Check if CircleX icon is rendered
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should not render Grid when there is an error', () => {
      vi.mocked(useUserList).mockReturnValue({
        data: undefined,
        isSuccess: false,
        isError: true,
        error: new Error('Error'),
      } as any);

      const { container } = render(<UserList />);

      // Grid should not be present in error state
      const grid = container.querySelector('[style*="grid"]');
      expect(grid).not.toBeInTheDocument();
    });
  });
});
