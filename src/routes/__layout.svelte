<script lang="ts">
  import { page } from '$app/stores'

  export let title = 'todo'
  export let description = 'SvelteKit + Supabase todo list.'
  export let colorScheme = '#282a36'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="url" content={$page.url.href} />
  <meta name="color-scheme" content={colorScheme} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_US" />
</svelte:head>

<header>
  <nav />
</header>

<slot />

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    :root {
      @apply bg-todo-black;
    }

    :root,
    body,
    main {
      @apply h-full;
    }
  }
</style>
