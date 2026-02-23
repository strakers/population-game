import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.custom'], // Add your custom extension
  },
});