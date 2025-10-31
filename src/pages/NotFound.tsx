import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      h="svh"
    >
      <Text textStyle="2xl" color="white">
        404 Page Not Found
      </Text>
      <Box color="white">
        <Text textDecoration="underline">
          <Link to="/">GO HOME</Link>
        </Text>
      </Box>
    </Box>
  );
}

export default NotFound;
