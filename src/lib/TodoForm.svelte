<script lang="ts">
  import octicons from '@primer/octicons'
  import { addTodo } from '../stores/todos'

  let value = ''

  const submit = (): void => {
    if (value.trim() === '') return
    addTodo(value)
    value = ''
  }

  const addIcon = octicons.plus.toSVG({
    'aria-label': 'Add to list',
    fill: 'currentColor'
  })
</script>

<form on:submit|preventDefault={submit} class="inline-block max-w-md w-full px-3 sm:px-0">
  <div
    class="flex border border-todo-white rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-todo-purple focus-within:border-todo-purple"
  >
    <!-- svelte-ignore a11y-autofocus -->
    <input type="text" autofocus bind:value class="grow py-3 pl-3 rounded-l-lg" />
    <button
      class="px-3 rounded-r-lg transition-colors hover:bg-todo-gray/50 focus-visible:bg-todo-gray/50 hover:text-todo-purple focus-visible:text-todo-purple"
    >
      {@html addIcon}
    </button>
  </div>
</form>
