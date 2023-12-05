import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/island3dPortfolio/",
  plugins: [react()],
  assetsInclude: ['**/*.glb']
})
