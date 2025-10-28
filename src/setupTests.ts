import '@testing-library/jest-dom';
import { vi } from 'vitest';

const ignoredMessages = ['Could not parse CSS stylesheet'];
vi.spyOn(console, 'error').mockImplementation((message) => {
  if (ignoredMessages.some((v) => message.includes(v))) {
    return;
  }
  console.info(message);
});
