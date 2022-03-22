<script lang="ts">
  import '@fontsource/fredoka-one'
  import '@fontsource/inter'
  import '../app.css'

  import supabase from '$lib/supabase'
  import { user } from '$stores/auth'
  import Auth from '$lib/Auth.svelte'
  import { loadTodos } from '$stores/todos'
  import { loadTodosOffline, localStorageSub, localStorageUnsub } from '$stores/todosOffline'

  user.set(supabase.auth.user())
  supabase.auth.onAuthStateChange((_, session) => {
    if (session !== null && session.user !== null) {
      localStorageUnsub()
      user.set(session.user)
      loadTodos()
    } else {
      user.set(null)
      loadTodosOffline()
      localStorageSub()
    }
  })
</script>

<!-- TODO: conditional nav sign-in/out -->
<Auth />
<slot />
