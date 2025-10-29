import UserList from '@/features/users/components/UserList';
import { Box, Text, Button } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box bg="brand.900">
      <Box
        mx={4}
        pt={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text as="h3" textStyle="2xl" color="white">
          My Contacts
        </Text>
        <Button bg="brand.800">Add Contact</Button>
      </Box>
      <UserList />
    </Box>
  );
}
