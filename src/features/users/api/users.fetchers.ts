import api from '@/shared/api/client';
import { USERS } from '@/shared/constants';
import type { User } from '../types/user.types';

async function fetchUserList(): Promise<User[]> {
  const { data } = await api.get<User[]>(USERS);
  return data;
}

export default fetchUserList;
