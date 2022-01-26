import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
    minify: false,
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
  server: {
    fs: {
      strict: true,
    },
  },
});
