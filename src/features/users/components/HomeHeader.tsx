import { Box, Button, Text } from '@chakra-ui/react';
import AddUserDialog from '@/features/users/components/AddUserDialog';
import { useState } from 'react';

function HomeHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
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
        <Button
          colorScheme="whiteAlpha"
          size="lg"
          backdropFilter="blur(10px)"
          bg="whiteAlpha.200"
          border="1px solid"
          borderColor="whiteAlpha.400"
          borderRadius="md"
          _hover={{
            bg: 'whiteAlpha.300',
          }}
          onClick={() => setOpen(true)}
        >
          Add Contact
        </Button>
      </Box>
      <AddUserDialog open={open} setOpen={setOpen} />
    </>
  );
}

export default HomeHeader;
