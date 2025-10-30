import LazyImage from '@/shared/components/LazyImage';
import { Box, GridItem, Icon, Text } from '@chakra-ui/react';
import { Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/user.types';
import { useUserStore } from '../store/useUserStore';

interface UserItemProps {
  user: User;
}

function UserItem({ user }: UserItemProps) {
  const navigate = useNavigate();
  const { setSelectedUser } = useUserStore();

  return (
    <GridItem
      key={user.id}
      m={2}
      position="relative"
      as="button"
      cursor="pointer"
      borderRadius="md"
      overflow="hidden"
      _hover={{
        '& .overlay-box': {
          opacity: 1,
          transform: 'translateY(0)',
        },
      }}
      onClick={() => {
        setSelectedUser(user);
        navigate('/detail');
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
        className="overlay-box"
        pos="absolute"
        bottom={0}
        left={0}
        right={0}
        backdropFilter="blur(15px)"
        filter="brightness(0.9) saturate(1.05)"
        boxShadow="dark-lg"
        p={2}
        opacity={{ base: 1, md: 0 }}
        transform={{ base: 'translateY(0)', md: 'translateY(100%)' }}
        transition="all 0.3s ease"
        borderTop="1px solid"
        borderColor="whiteAlpha.400"
      >
        <Text textStyle="lg" color="white" textAlign="start">
          {user.name}
        </Text>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          spaceX={1}
        >
          <Icon size="xs" color="white">
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
          <Icon size="xs" color="white">
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
