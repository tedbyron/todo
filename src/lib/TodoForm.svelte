<script lang="ts">
  import octicons from '@primer/octicons'
  import { user } from '$stores/auth'
  import { addTodo as storeTodo } from '$stores/todos'
  import { addTodoOffline as storeTodoOffline } from '$stores/todosOffline'
  import LoadingIcon from '$lib/assets/LoadingIcon.svelte'

  let input = ''
  let loading = false

  // Add a todo to the database if the user is logged in, or else localStorage.
  const addTodo = async (): Promise<void> => {
    loading = true
    if (input.trim() === '') return

    $user ? await storeTodo(input, $user.id) : storeTodoOffline(input)

    input = ''
    loading = false
  }

  const plusIcon = octicons.plus.toSVG({
    'aria-label': 'Add to list',
    fill: 'currentColor'
  })
</script>

<form on:submit|preventDefault={addTodo} class="inline-block max-w-md w-full px-3 sm:px-0">
  <div
    class="flex border border-todo-white rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-todo-purple focus-within:border-todo-purple"
  >
    <!-- Text input -->
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="text"
      autofocus
      bind:value={input}
      aria-label="Todo text"
      class="grow py-3 pl-3 rounded-l-lg"
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
        {@html plusIcon}
      {/if}
    </button>
  </div>
</form>
