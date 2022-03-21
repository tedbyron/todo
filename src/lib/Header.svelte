<script lang="ts">
  import supabase from './supabase'

  const logout = (): void => {
    supabase.auth.signOut()
  }
</script>

<header>
  <nav>
    <button type="button" on:click={logout}>Sign out</button>
  </nav>
</header>
