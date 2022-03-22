import path from 'path'
import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    vite: {
      envPrefix: 'TODO_',
      resolve: {
        alias: {
          $routes: path.resolve('src', 'routes'),
          $stores: path.resolve('src', 'stores')
        }
      }
    }
  }
}

export default config
