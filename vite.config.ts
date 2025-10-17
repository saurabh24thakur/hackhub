
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  const port = 5173;
  const host = 'localhost';

  // Log the app URL to the console
  if (command === 'serve') {
    console.log(`App is running at: http://${host}:${port}`);
  }

  return {
    plugins: [react()],
    server: {
      port,
      host,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
