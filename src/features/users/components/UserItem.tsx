import { Box, GridItem, Text, Icon } from '@chakra-ui/react';
import { Phone, Mail, Pencil } from 'lucide-react';
import LazyImage from '@/shared/components/LazyImage';
import { useEffect, useState } from 'react';
import { User } from '../types/user.types';
import AddAndEditContactDialog from './AddAndEditContactDialog';
import { useUserStore } from '../store/useUserStore';

interface UserItemProps {
  user: User;
}

function UserItem({ user }: UserItemProps) {
  const [open, setOpen] = useState(false);
  const { setSelectedUser } = useUserStore();

  useEffect(() => {
    if (open) {
      setSelectedUser(user);
    }
  }, [open]);

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
      onClick={() => {}}
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
        boxShadow="dark-lg"
        p={2}
        opacity={{ base: 1, md: 0 }}
        transform={{ base: 'translateY(0)', md: 'translateY(100%)' }}
        transition="all 0.3s ease"
        borderTop="1px solid"
        borderColor="brand.900"
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

      <AddAndEditContactDialog
        open={open}
        setOpen={setOpen}
        trigger={
          <Box
            className="overlay-box"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            pos="absolute"
            top={0}
            right={0}
            backdropFilter="blur(15px)"
            boxShadow="dark-lg"
            spaceX={2}
            p={2}
            opacity={{ base: 1, md: 0 }}
            transform={{ base: 'translateY(0)', md: 'translateY(-100%)' }}
            transition="all 0.3s ease"
            borderBottom="1px solid"
            borderLeft="1px solid"
            borderColor="brand.900"
            borderBottomLeftRadius="md"
            onClick={(e) => {
              e.stopPropagation();
            }}
            as="button"
            cursor="pointer"
          >
            <Icon size="xs" color="brand.900" fill="whiteAlpha.500">
              <Pencil />
            </Icon>
            <Text textStyle="sm" color="brand.900">
              Edit
            </Text>
          </Box>
        }
      />
    </GridItem>
  );
}

export default UserItem;
