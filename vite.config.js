import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";
// import { viteStaticCopy } from "vite-plugin-static-copy"
// import path from "path"


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),svgr()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/election-index.js',
        chunkFileNames: 'assets/election-[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/election-index.css'
          }
          return 'assets/[name][extname]'
        }
      }
    }
  },
  base:"/voting-app/"
})
