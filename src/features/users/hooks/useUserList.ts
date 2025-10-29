import { useQuery } from '@tanstack/react-query';
import { USERS_KEY } from '@/shared/constants';
import fetchUserList from '../api/users.fetchers';
import { User } from '../types/user.types';

const useUserList = () =>
  useQuery<User[]>({
    queryKey: [USERS_KEY],
    queryFn: fetchUserList,
  });

export default useUserList;
