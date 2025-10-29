import { Box, Grid, useBreakpointValue, Text, Icon } from '@chakra-ui/react';
import { useEffect } from 'react';
import { CircleX } from 'lucide-react';
import useUserList from '../hooks/useUserList';
import { useUserStore } from '../store/useUserStore';
import UserItem from './UserItem';
import UserItemLoading from './UserItemLoading';

function UserList() {
  const columns = useBreakpointValue({
    base: 1,
    sm: 3,
    md: 4,
    lg: 5,
  });
  const { data, isSuccess, isError, error } = useUserList();
  const { userList, setUserList } = useUserStore();

  useEffect(() => {
    if (data) {
      setUserList(data);
    }
  }, [data]);

  const renderContent = (): JSX.Element | JSX.Element[] => {
    // success state
    if (isSuccess) {
      return userList.map((user) => <UserItem user={user} key={user.id} />);
    }

    // loading state
    const loadingItems = Array.from({ length: 10 }, (_, i) => ({
      id: `item-${i}`,
    }));
    return loadingItems.map((item) => <UserItemLoading key={item.id} />);
  };

  if (isError) {
    return (
      <Box
        height="svh"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        spaceY={1.5}
      >
        <Icon size="2xl" color="white" fill="whiteAlpha.500">
          <CircleX />
        </Icon>
        <Text textStyle="lg" color="white">
          {error.message}
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Grid
        templateColumns={{
          base: `repeat(${columns}, 1fr)`,
          mdDown: `repeat(${columns}, 1fr)`,
        }}
        p={2}
      >
        {renderContent()}
      </Grid>
    </Box>
  );
}

export default UserList;
