import { defineConfig } from 'vite'
import { config } from 'dotenv';
import react from '@vitejs/plugin-react-swc'
config();
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        secure:false,
      },
    },
  }, 
  define: {
    'process.env': process.env
  },
  plugins: [react()],
});
