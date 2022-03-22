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

  supabase.auth.onAuthStateChange(async (_, session) => {
    if (session !== null && session.user !== null) {
      localStorageUnsub()
      user.set(session.user)
      await loadTodos()

      if ($page.routeId !== '') {
        goto('/')
      }
    } else {
      user.set(null)
      loadTodosOffline()
      localStorageSub()
    }
  })
</script>

<Header />
<slot />
