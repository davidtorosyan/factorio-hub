import { imagetools } from 'vite-imagetools'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  modules: ['nuxt-primevue', "@nuxt/content"],
  experimental: {
    asyncContext: true
  },
  vite: {
    plugins: [
      imagetools({
        include: 'assets\/img\/icons\/*',
      })
    ]
  }
})