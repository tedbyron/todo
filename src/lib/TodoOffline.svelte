<script lang="ts">
  import octicons from '@primer/octicons'
  import { deleteTodo, toggleTodo } from '$stores/todosOffline'
  import type { Todo } from '$stores/todos'

  export let todo: Todo

  const toggleIcon = octicons.check.toSVG({
    'aria-label': 'Toggle done',
    fill: 'currentColor'
  })
  const deleteIcon = octicons.x.toSVG({
    'aria-label': 'Delete',
    fill: 'currentColor'
  })
</script>

<li
  class="flex flex-col max-w-md w-full border rounded-lg
    {todo.done ? '!border-todo-gray !ring-todo-gray text-todo-gray' : 'border-todo-white'}"
>
  <input
    type="text"
    readonly
    value={todo.text}
    class="p-3 rounded-t-lg{todo.done ? ' line-through' : ''}"
  />
  <div class="flex justify-center">
    <button
      type="button"
      class="p-3 hover:bg-todo-gray/50 focus-visible:bg-todo-gray/50 hover:text-todo-green focus-visible:text-todo-green
        {todo.done ? 'text-todo-green' : ''}"
      on:click={() => toggleTodo(todo.id)}
    >
      {@html toggleIcon}
    </button>
    <button
      type="button"
      class="p-3 hover:bg-todo-gray/50 focus-visible:bg-todo-gray/50 hover:text-todo-red focus-visible:text-todo-red"
      on:click={() => deleteTodo(todo.id)}
    >
      {@html deleteIcon}
    </button>
  </div>
</li>
