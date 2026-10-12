import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  // Fecha de construcción visible en el sitio: confirma que lo publicado es lo más reciente
  define: { __BUILD_TIME__: JSON.stringify(new Date().toISOString()) },
  server: { host: true, allowedHosts: true },
})
