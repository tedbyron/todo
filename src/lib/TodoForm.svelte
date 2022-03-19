<script lang="ts">
  let value = ''

  const addTodo = (): void => {
    if (value.trim() === '') return

    value = ''
  }
</script>

<form on:submit|preventDefault={addTodo} class="inline-block max-w-md w-full px-3 sm:px-0">
  <div class="input-container flex border border-todo-white rounded-lg">
    <input type="text" bind:value class="grow py-3 pl-3 rounded-l-lg" />
    <button
      tabindex="-1"
      class="px-3 rounded-r-lg justify-self-stretch transition-colors hover:bg-todo-gray/50"
    >
      +
    </button>
  </div>
</form>
