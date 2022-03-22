<script lang="ts">
  import octicons from '@primer/octicons'
  import { browser } from '$app/env'
  import { page } from '$app/stores'
  import { user } from '$stores/auth'
  import supabase from '$lib/supabase'
  import LoadingIcon from '$lib/assets/LoadingIcon.svelte'

  let loading = false

  // Sign out the supabase user.
  const signOut = async (): Promise<void> => {
    try {
      loading = true
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error: unknown) {
      console.error(error)
    } finally {
      loading = false
    }
  }

  const personIcon = octicons.person.toSVG({
    'aria-label': 'User',
    fill: 'currentColor'
  })
  const signInIcon = octicons['sign-in'].toSVG({
    'aria-label': 'Sign in',
    fill: 'currentColor'
  })
  const signOutIcon = octicons['sign-out'].toSVG({
    'aria-label': 'Sign out',
    fill: 'currentColor'
  })
</script>

<header class="container my-6">
  <nav class="grid grid-cols-3 justify-center">
    <!-- Placeholder div to center the h1 -->
    <div />

    <!-- Site heading -->
    <a sveltekit:prefetch href="/" class="group mx-auto">
      <h1
        class="font-serif border-b-8 group-hover:border-todo-purple group-focus-visible:border-todo-purple rounded-b-sm text-5xl lg:text-6xl group-hover:text-todo-purple group-focus-visible:text-todo-purple"
      >
        Todo
      </h1>
    </a>

    <div class="justify-self-end flex items-center gap-3">
      {#if $user}
        <!-- Username -->
        <div title={`ID: ${$user.id}`} class="flex items-center gap-2 p-3 rounded-lg">
          {@html personIcon}
          {$user.email}
        </div>

        <hr class="h-1/3 border-r border-todo-white" />

        <!-- Sign out button -->
        <button
          type="button"
          disabled={loading}
          on:click={signOut}
          class="flex items-center gap-2 p-3 rounded-lg {loading
            ? 'pointer-events-none'
            : 'hover:text-todo-purple focus-visible:text-todo-purple hover:bg-todo-gray/50 focus-visible:bg-todo-gray/50'}"
        >
          Sign out
          {#if loading}
            <LoadingIcon class="animate-spin w-4 h-4 text-white" />
          {:else}
            {@html signOutIcon}
          {/if}
        </button>
      {:else if browser && $page.routeId !== 'login'}
        <!-- Sign in button -->
        <a
          sveltekit:prefetch
          href="/login"
          class="flex items-center gap-2 p-3 rounded-lg hover:text-todo-purple focus-visible:text-todo-purple hover:bg-todo-gray/50 focus-visible:bg-todo-gray/50"
        >
          Sign in
          {@html signInIcon}
        </a>
      {/if}
    </div>
  </nav>
</header>
