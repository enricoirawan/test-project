import { Box, GridItem, Text, Icon } from '@chakra-ui/react';
import { Phone, Mail } from 'lucide-react';
import LazyImage from '@/shared/components/LazyImage';
import { User } from '../types/user.types';

interface UserItemProps {
  user: User;
}

function UserItem({ user }: UserItemProps) {
  return (
    <GridItem
      key={user.id}
      m={2}
      position="relative"
      cursor="pointer"
      borderRadius="md"
      overflow="hidden"
      _hover={{
        '& > div:last-child': {
          opacity: 1,
          transform: 'translateY(0)',
        },
      }}
    >
      <LazyImage
        minH="400px"
        w="full"
        src={`https://picsum.photos/400/600?random=${user.id % 1000}.webp`}
        objectFit="cover"
        backdropFilter="blur(15px)"
        boxShadow="dark-lg"
      />
      <Box
        pos="absolute"
        bottom={0}
        left={0}
        right={0}
        backdropFilter="blur(15px)"
        boxShadow="dark-lg"
        p={2}
        opacity={{ base: 1, md: 0 }}
        transform={{ base: 'translateY(0)', md: 'translateY(100%)' }}
        transition="all 0.3s ease"
        borderTop="1px solid"
        borderColor="whiteAlpha.300"
      >
        <Text textStyle="lg" color="white">
          {user.name}
        </Text>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          spaceX={1}
        >
          <Icon size="xs" color="white" fill="whiteAlpha.500">
            <Phone />
          </Icon>
          <Text textStyle="sm" color="white">
            {user.phone}
          </Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          spaceX={1}
        >
          <Icon size="xs" color="white" fill="whiteAlpha.500">
            <Mail />
          </Icon>
          <Text textStyle="sm" color="white">
            {user.email}
          </Text>
        </Box>
      </Box>
    </GridItem>
  );
}

export default UserItem;
