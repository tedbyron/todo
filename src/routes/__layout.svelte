<script lang="ts">
  import '@fontsource/fredoka-one'
  import '@fontsource/inter'
  import '../app.css'

  import supabase from '$lib/supabase'
  import { user } from '$stores/auth'
  import Auth from '$lib/Auth.svelte'
  import { loadTodos } from '$stores/todos'

  user.set(supabase.auth.user())
  supabase.auth.onAuthStateChange((_, session) => {
    if (session !== null && session.user !== null) {
      user.set(session.user)
      loadTodos()
    }
  })
</script>

<!-- TODO: conditional nav sign-in/out -->
<Auth />
<slot />
