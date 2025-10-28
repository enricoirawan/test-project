import { ChakraProvider } from '@chakra-ui/react';

import system from '@/shared/theme';
import AppRouter from '@/shared/AppRouter';

function App() {
  return (
    <ChakraProvider value={system}>
      <AppRouter />
    </ChakraProvider>
  );
}

export default App;
