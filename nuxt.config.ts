import {defineNuxtConfig} from 'nuxt/config';

export default defineNuxtConfig({
  builder: 'webpack',
  /* builder: 'webpack' delete this row and dependencies if I need to use vite
  * "devDependencies": {"node-sass": "^8.0.0", "sass-loader": "^13.2.0"},
  * "dependencies": {"@nuxt/webpack-builder": "^3.0.0"}
  */
  typescript: {
    strict: true
  },
  nitro: {
    devProxy: {
      '/api/': {
        target: process.env.NODE_ENV === 'development'?'http://localhost:8000' : 'https://buzinov.dev',
        changeOrigin: true
      }
    },
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI
  },
  app: {
    head: {
      "title": 'Buzinov.dev',
      "meta": [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "charset": "utf-8"
        }
      ],
      "link": [],
      "style": [],
      "script": [],
      "noscript": []
    },
    pageTransition: {name: 'page', mode: 'out-in'}
  },
  css: [
    '@/assets/styles/normalize.min.css',
    '@/assets/styles/_variables.scss',
    '@/assets/styles/main.scss',
    '@/assets/styles/_media.scss',
  ],
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore']
        ],
      }
    ]
  ]
})
