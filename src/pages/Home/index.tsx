import HomeHeader from '@/features/users/components/HomeHeader';
import UserList from '@/features/users/components/UserList';
import { Box } from '@chakra-ui/react';

export default function HomePage() {
  return (
    <Box>
      <HomeHeader />
      <UserList />
    </Box>
  );
}
