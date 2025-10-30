import DetailHeader from '@/features/users/components/DetailHeader';
import DetailUser from '@/features/users/components/DetailUser';
import ErrorUser from '@/features/users/components/ErrorUser';
import { useUserStore } from '@/features/users/store/useUserStore';
import { Box } from '@chakra-ui/react';

function DetailPage() {
  const { selectedUser } = useUserStore();

  if (!selectedUser) return <ErrorUser />;

  return (
    <Box p={4}>
      <DetailHeader user={selectedUser} />
      <DetailUser user={selectedUser} />
    </Box>
  );
}

export default DetailPage;
