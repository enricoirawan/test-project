import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from '@/components/ui/toaster';

import system from '@/shared/theme';
import AppRouter from '@/app/router/AppRouter';
import QueryProvider from '@/app/providers/QueryProvider';

function App() {
  return (
    <QueryProvider>
      <ChakraProvider value={system}>
        <AppRouter />
        <Toaster />
      </ChakraProvider>
    </QueryProvider>
  );
}

export default App;
