import { create } from 'zustand';
import type { User } from '../types/user.types';

interface UserStore {
  userList: User[];
  selectedUser: User | null;
  setUserList: (users: User[]) => void;
  setSelectedUser: (users: User) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userList: [],
  selectedUser: null,
  setUserList: (users: User[]) => set(() => ({ userList: users })),
  setSelectedUser: (user: User) => set(() => ({ selectedUser: user })),
  addUser: (user: User) =>
    set((state) => ({ userList: [...state.userList, user] })),
  updateUser: (updatedUser: User) =>
    set((state) => ({
      userList: state.userList.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    })),
  deleteUser: (user: User) =>
    set((state) => ({
      userList: state.userList.filter((userState) => user.id === userState.id),
    })),
}));
