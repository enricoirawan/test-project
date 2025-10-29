import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import React from 'react';
import system from '../theme';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

interface AllProvidersProps {
  children: React.ReactNode;
}

function AllProviders({ children }: AllProvidersProps) {
  const client = createTestQueryClient();

  return (
    <QueryClientProvider client={client}>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </QueryClientProvider>
  );
}

const customRender = (ui: React.ReactElement) => {
  return render(ui, {
    wrapper: ({ children }) => <AllProviders>{children}</AllProviders>,
  });
};

export * from '@testing-library/react';
export { customRender as render };
