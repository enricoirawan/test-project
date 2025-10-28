import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e6f2ff' },
          100: { value: '#baddff' },
          200: { value: '#8dc8ff' },
          300: { value: '#5bb3ff' },
          400: { value: '#2e9eff' },
          500: { value: '#0089ff' },
          600: { value: '#0074e6' },
          700: { value: '#005db3' },
          800: { value: '#004680' },
          900: { value: '#00304d' },
        },
      },
      fonts: {
        heading: { value: 'Inter, sans-serif' },
        body: { value: 'Inter, sans-serif' },
      },
      spacing: {
        xs: { value: '0.5rem' },
        sm: { value: '1rem' },
        md: { value: '1.5rem' },
        lg: { value: '2rem' },
        xl: { value: '3rem' },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          value: { base: '{colors.brand.500}', _dark: '{colors.brand.400}' },
        },
        secondary: {
          value: { base: '{colors.gray.600}', _dark: '{colors.gray.400}' },
        },
        bg: {
          canvas: {
            value: { base: '{colors.gray.50}', _dark: '{colors.gray.900}' },
          },
          surface: {
            value: { base: 'white', _dark: '{colors.gray.800}' },
          },
        },
        text: {
          primary: {
            value: { base: '{colors.gray.900}', _dark: 'white' },
          },
          secondary: {
            value: { base: '{colors.gray.600}', _dark: '{colors.gray.400}' },
          },
        },
        // Border colors
        border: {
          value: { base: '{colors.gray.200}', _dark: '{colors.gray.700}' },
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, customConfig);
export default system;
