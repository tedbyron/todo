<script lang="ts">
  import supabase from './supabase'

  let loading = false
  let email: string

  const signIn = async (): Promise<void> => {
    try {
      loading = true
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for a link to login.')
    } catch (error: unknown) {
      console.error(error)
    } finally {
      loading = false
    }
  }
</script>

<h1>Log in</h1>
<p>Sign in with email</p>

<form on:submit|preventDefault={signIn} class="flex flex-col max-w-md">
  <label for="login-email">Email address</label>
  <input type="email" id="login-email" bind:value={email} class="border border-todo-white" />
</form>
