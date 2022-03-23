<script lang="ts">
  import octicons from '@primer/octicons'
  import supabase from '$lib/supabase'
  import LoadingIcon from '$lib/assets/LoadingIcon.svelte'
  import type { UserCredentials } from '@supabase/supabase-js'

  let loading = false
  let emailSent = false
  let email: string

  // Send a sign in link to the input email.
  const signIn = async (userCredentials: UserCredentials, successVar?: boolean): Promise<void> => {
    try {
      loading = true
      const { error } = await supabase.auth.signIn(userCredentials)
      if (error) throw error
      if (successVar !== undefined) successVar = true
    } catch (error: unknown) {
      console.error(error)
    } finally {
      loading = false
    }
  }

  const arrowRightIcon = octicons['arrow-right'].toSVG({
    'aria-label': 'Submit',
    fill: 'currentColor'
  })
  const markGithubIcon = octicons['mark-github'].toSVG({
    'aria-label': 'GitHub logo',
    fill: 'currentColor'
  })
</script>

<svelte:head>
  <title>Todo | Sign in</title>
  <meta property="og:title" content="Todo | Sign in" />
</svelte:head>

<section class="container my-6 px-3 sm:px-0">
  <form
    on:submit|preventDefault={async () => await signIn({ email }, emailSent)}
    class="flex flex-col gap-3 mx-auto max-w-md p-6 border border-todo-white rounded-lg"
  >
    {#if emailSent}
      <!-- Email sent -->
      <span class="px-3 text-center">
        Sign-in email sent to
        <span class="text-todo-purple">{email}</span>
      </span>
    {:else}
      <div
        class="flex border border-todo-white rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-todo-purple focus-within:border-todo-purple"
      >
        <!-- Email input -->
        <!-- svelte-ignore a11y-autofocus -->
        <input
          type="email"
          id="login-email"
          aria-label="Email login"
          autofocus
          placeholder="Email"
          bind:value={email}
          class="grow py-3 pl-3 rounded-l-md"
        />

        <!-- Submit button -->
        <button
          disabled={loading}
          class="px-3 rounded-r-lg {loading
            ? 'pointer-events-none'
            : 'hover:bg-todo-gray/50 focus-visible:bg-todo-gray/50 hover:text-todo-purple focus-visible:text-todo-purple'}"
        >
          {#if loading}
            <LoadingIcon class="animate-spin w-4 h-4 text-white" />
          {:else}
            {@html arrowRightIcon}
          {/if}
        </button>
      </div>

      <!-- GitHub login -->
      <div class="mt-3">
        <button
          on:click={async () => await signIn({ provider: 'github' })}
          class="flex items-center gap-2 p-3 rounded-lg hover:text-todo-purple focus-visible:text-todo-purple hover:bg-todo-gray/50 focus-visible:bg-todo-gray/50"
        >
          {@html markGithubIcon}
          GitHub sign in
          {@html arrowRightIcon}
        </button>
      </div>
    {/if}
  </form>
</section>
