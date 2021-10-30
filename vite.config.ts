import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      refTransform: true
    }),
    vueJsx(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
    
  ],
  server: {
    open: true,
    cors: true,
    proxy: {
    }
  },
  build: {
    sourcemap: true
  }
})
