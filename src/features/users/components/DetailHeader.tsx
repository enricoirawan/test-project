import { Button, Icon, Text, Box } from '@chakra-ui/react';
import { ArrowLeft, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toaster } from '@/components/ui/toaster';
import { User } from '../types/user.types';
import { useUserStore } from '../store/useUserStore';

interface DetailHeaderProps {
  user: User;
}

function DetailHeader({ user }: DetailHeaderProps) {
  const navigate = useNavigate();
  const { deleteUser } = useUserStore();

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
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
        onClick={() => navigate(-1)}
      >
        <Icon>
          <ArrowLeft />
        </Icon>
        <Text>Back</Text>
      </Button>
      <Button
        colorScheme="whiteAlpha"
        size="lg"
        backdropFilter="blur(10px)"
        bg="red.500"
        border="1px solid"
        borderColor="whiteAlpha.400"
        borderRadius="md"
        _hover={{
          bg: 'red.600',
        }}
        onClick={() => {
          deleteUser(user);
          toaster.create({
            description: 'Used deleted successfully',
            type: 'success',
          });
          navigate(-1);
        }}
      >
        <Icon>
          <Trash />
        </Icon>
        <Text>Delete</Text>
      </Button>
    </Box>
  );
}

export default DetailHeader;
