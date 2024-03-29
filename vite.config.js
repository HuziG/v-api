// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts()],
  resolve: {
    alias: {
      'v-api': resolve(__dirname, './package/index.ts'),
    },
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './package/index.ts'),
      name: 'vApi',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'axios'],
      output: {
        name: 'v-api',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
    define: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      VERSION: JSON.stringify(require('./package.json').version),
    },
  },
})
