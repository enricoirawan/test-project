import Header from '@/features/users/components/Header';
import UserList from '@/features/users/components/UserList';
import { Box } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box bg="brand.900">
      <Header />
      <UserList />
    </Box>
  );
}
