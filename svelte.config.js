import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  }),
  kit: {
    adapter: adapter()
  }
}

export default config
