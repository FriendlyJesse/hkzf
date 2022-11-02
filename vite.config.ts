import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

// env
const env = loadEnv(process.env.NODE_ENV, './')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: env.VITE_APP_TITLE,
          injectScript: `<script src="https://api.map.baidu.com/api?v=1.0&&type=webgl&ak=${env.VITE_APP_MAP_SECRET}"></script>`
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
