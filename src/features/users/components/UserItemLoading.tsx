import { Box, GridItem, Skeleton, SkeletonText } from '@chakra-ui/react';

function UserItemLoading() {
  return (
    <GridItem m={2} cursor="pointer" borderRadius="md" overflow="hidden">
      <Box minH="400px" border="1px solid" borderColor="whiteAlpha.300">
        <Skeleton h="300px" w="full" borderRadius="md" />
        <Box h="100px" mt={3} mx={2} spaceY={2}>
          <SkeletonText noOfLines={2} />
          <SkeletonText noOfLines={2} />
        </Box>
      </Box>
    </GridItem>
  );
}

export default UserItemLoading;
