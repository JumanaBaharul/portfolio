import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
// Single-file build: JS + CSS inlined into index.html — the entire
// portfolio is one portable file (dist/index.html). Open it anywhere.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
})
