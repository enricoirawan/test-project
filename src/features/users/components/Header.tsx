import { Box, Button, Text } from '@chakra-ui/react';
import AddAndEditContactDialog from '@/features/users/components/AddAndEditContactDialog';
import { useState } from 'react';

function Header() {
  const [open, setOpen] = useState(false);

  return (
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
      <AddAndEditContactDialog
        open={open}
        setOpen={setOpen}
        trigger={
          <Button
            colorScheme="whiteAlpha"
            size="lg"
            backdropFilter="blur(10px)"
            bg="whiteAlpha.200"
            border="1px solid"
            borderColor="whiteAlpha.400"
            _hover={{
              bg: 'whiteAlpha.300',
            }}
          >
            Add Contact
          </Button>
        }
      />
    </Box>
  );
}

export default Header;
