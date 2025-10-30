import { Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function ErrorUser() {
  const navigate = useNavigate();

  return (
    <Box
      p={4}
      h="svh"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      spaceY={1}
    >
      <Text color="white" textStyle="lg">
        Something wrong...
      </Text>
      <Text
        color="white"
        textDecor="underline"
        cursor="pointer"
        as="button"
        onClick={() => {
          navigate('/');
        }}
      >
        Go Back
      </Text>
    </Box>
  );
}

export default ErrorUser;
