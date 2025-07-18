import { defineConfig } from 'vitest/config'

// biome-ignore lint/style/noDefaultExport: vite expects default export
export default defineConfig({
  test: {
    globals: true,
    watch: false,
    restoreMocks: true,
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
})
