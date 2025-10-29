import { ChakraProvider } from '@chakra-ui/react';

import system from '@/shared/theme';
import AppRouter from '@/app/router/AppRouter';
import QueryProvider from '@/app/providers/QueryProvider';

function App() {
  return (
    <QueryProvider>
      <ChakraProvider value={system}>
        <AppRouter />
      </ChakraProvider>
    </QueryProvider>
  );
}

export default App;
