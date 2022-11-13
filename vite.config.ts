import { resolve } from 'path'
import { defineConfig } from 'vite'
import VueTermui from 'vite-plugin-vue-termui'
import pkg from './package.json'

const deps = Object.keys(pkg.dependencies)
export default defineConfig({
  define: {
    __DEV__: JSON.stringify(!(process.env.NODE_ENV === 'production')),
  },
  plugins: [
    VueTermui(
      {
        autoImportOptions: {
          dirs: ['src/composables/**', 'src/store/**'],
        },
      },
    ),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
    mainFields: process.env.NODE_ENV === 'production' ? ['module', 'main'] : ['main', 'module'],
  },

  build: {
    rollupOptions: {
      external: deps,
    },
  },
})
