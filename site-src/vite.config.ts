import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// Builds into the repo root (one level up). Existing folders are never emptied.
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: { outDir: '..', emptyOutDir: false, assetsDir: 'site-assets' },
})
