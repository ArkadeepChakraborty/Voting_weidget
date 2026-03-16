import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";
import { viteStaticCopy } from "vite-plugin-static-copy"
import path from "path"


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),svgr(),
    viteStaticCopy({
      targets: [
        {
          src: "../voting_shared/election-data.js",
          dest: ""
        }
      ]
    })
  ],
})
