import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { Card } from '@/components/ui/Card';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/markdown-mindmapper/', // Change this to your repo name for GitHub Pages
});
