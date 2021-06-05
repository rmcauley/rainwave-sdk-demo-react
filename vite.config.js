import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/',
  build: {
    outDir: '../dist/app',
    emptyOutDir: true,
  },
  server: {
    port: '8080',
    open: true,
    strictPort: true,
  },
  plugins: [reactRefresh()],
});
