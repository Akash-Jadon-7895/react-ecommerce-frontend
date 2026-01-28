import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [['babel-plugin-react-compiler', { target: '19' }]],
    },
  })],
  // server: {
  //   proxy: {
  //     '': {
  //       target: 'https://react-ecommerce-backend-o6ih.onrender.com',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     '/images': {
  //       target: 'https://react-ecommerce-backend-o6ih.onrender.com',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   }
  // }
})
