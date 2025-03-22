import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer'; // Correct import

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }) // Opens a visual report in the browser
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['lodash', 'axios'], // Add more dependencies here
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase limit if needed
  },
});
