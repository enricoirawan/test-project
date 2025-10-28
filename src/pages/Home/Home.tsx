import { Button, Heading, VStack } from '@chakra-ui/react';

export default function Home() {
  return (
    <VStack spaceY={1} p={8}>
      <Heading>Welcome!</Heading>
      <Button colorScheme="blue">Click me</Button>
    </VStack>
  );
}
