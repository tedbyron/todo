<script lang="ts">
  import '@fontsource/fredoka-one'
  import '@fontsource/inter'
  import '../app.css'

  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import { user } from '$stores/auth'
  import { loadTodos } from '$stores/todos'
  import { loadTodosOffline, localStorageSub, localStorageUnsub } from '$stores/todosOffline'
  import supabase from '$lib/supabase'
  import Header from '$lib/Header.svelte'

  // Load todos.
  onMount(async () => {
    user.set(supabase.auth.user())
    if ($user === null) {
      loadTodosOffline()
      localStorageSub()
    } else {
      localStorageUnsub()
      await loadTodos()
    }
  })

  // Auth state change subscriber.
  supabase.auth.onAuthStateChange(async (_, session) => {
    if (session !== null && session.user !== null) {
      localStorageUnsub()
      user.set(session.user)
      await loadTodos()

      // Redirect to the home page on sign in.
      if ($page.routeId === 'login') {
        goto('/')
      }
    } else {
      user.set(null)
      loadTodosOffline()
      localStorageSub()
    }
  })
</script>

<svelte:head>
  <meta name="description" content="SvelteKit + Supabase todo list." />
  <meta name="url" content={$page.url.href} />
  <meta name="color-scheme" content="#bd93f9" />
  <meta property="og:description" content="SvelteKit + Supabase todo list." />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_US" />
</svelte:head>

<Header />
<slot />
