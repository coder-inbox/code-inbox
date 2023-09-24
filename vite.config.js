import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, './src'),
        },
    },
  define: {
    "process.env": process.env,
  },
  // optimizeDeps: {
  //   include: ['@mui/material/Tooltip'],
  // },
})
