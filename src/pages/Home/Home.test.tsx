import { render, screen } from '@/shared/test-utils/TestUtils';
import { Button } from '@chakra-ui/react';

test('renders button', () => {
  render(<Button>Hello</Button>);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
