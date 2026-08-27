import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['projects/extra-clarity/**/*.spec.ts'],
    environment: 'node',
  },
});
