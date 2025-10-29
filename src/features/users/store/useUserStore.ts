import { create } from 'zustand';
import type { User } from '../types/user.types';

interface UserStore {
  userList: User[];
  selectedHoverUser: User | null;
  setUserList: (users: User[]) => void;
  setSelectedHoverUser: (users: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userList: [],
  selectedHoverUser: null,
  setUserList: (users: User[]) => set(() => ({ userList: users })),
  setSelectedHoverUser: (user: User) =>
    set(() => ({ selectedHoverUser: user })),
}));
