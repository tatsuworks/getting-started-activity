import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, `${process.cwd()}/..`, '')
  const allowedHosts = [env.ALLOWED_HOSTS ?? ''];
  
  return {
    plugins: [react()],
    envDir: '../',
    server: {
      allowedHosts,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
      hmr: {
        clientPort: 443,
      },
    },
  }
})
